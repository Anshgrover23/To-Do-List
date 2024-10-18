import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white text-center py-6 mt-12 w-full">
      <p>&copy; 2024 Made with &#10084; by Ansh Grover. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="text-black hover:text-pink-500"
        >
          <FaInstagram size={40} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className="text-black hover:text-blue-600"
        >
          <FaFacebook size={40} />
        </a>
        <a
          href="https://x.com/"
          target="_blank"
          className="text-black hover:text-blue-400"
        >
          <FaXTwitter size={40} />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className="text-black hover:text-blue-700"
        >
          <FaLinkedin size={40} />
        </a>
        <a
          href="https://github.com/Groverio"
          target="_blank"
          className="text-black hover:text-gray-700"
        >
          <FaGithub size={40} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          className="text-black hover:text-red-600"
        >
          <FaYoutube size={40} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
