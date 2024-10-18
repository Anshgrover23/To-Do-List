// Required Modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const rateLimit = require('express-rate-limit');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// App Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Setup
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Session Setup with MongoDB Store
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/todo-app',
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 1 day expiration
}));

// User Schema with Password Hashing
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  totpSecret: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// Passport Google OAuth Setup
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value
    });
    await user.save();
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Encryption Functionality
const encrypt = (text) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from('your_32_character_key_here');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

const decrypt = (encryptedText, iv) => {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from('your_32_character_key_here');
  
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Rate Limiting for Login Attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // Limit each IP to 5 login attempts per windowMs
  message: "Too many login attempts, please try again after 15 minutes"
});

// Routes

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});

// Two-Factor Authentication (2FA) Setup
app.get('/setup-2fa', async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  
  // Save the secret in the user's record
  await User.updateOne({ _id: req.user.id }, { $set: { totpSecret: secret.base32 } });
  
  // Generate QR code for the user to scan
  qrcode.toDataURL(secret.otpauth_url, (err, data) => {
    if (err) throw err;
    res.send(`<img src="${data}" alt="Scan this with your 2FA app"/>`);
  });
});

// 2FA Verification
app.post('/verify-2fa', async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);
  
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret,
    encoding: 'base32',
    token
  });

  if (verified) {
    res.send("2FA Verified!");
  } else {
    res.status(400).send("Invalid Token");
  }
});

// User Login with Rate Limiting
app.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.login(user, err => {
      if (err) return res.status(500).send('Login error');
      res.redirect('/dashboard');
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Task Creation (with Encryption)
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  const encryptedTask = encrypt(description);

  // Save the encrypted task data to the DB (example of how to store encrypted data)
  res.send(`Task Encrypted and Saved: ${JSON.stringify(encryptedTask)}`);
});

// Fetch and Decrypt Task Example
app.get('/tasks/:id', async (req, res) => {
  const encryptedTask = { /* fetch from DB */ }; // Example encrypted task
  const decryptedTask = decrypt(encryptedTask.encryptedData, encryptedTask.iv);
  
  res.send(`Decrypted Task: ${decryptedTask}`);
});

// Start the Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
