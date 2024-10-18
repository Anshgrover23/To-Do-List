let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let currentSortMethod = 'date'; // Default sort method
let currentSortOrder = 'asc'; // Default sort order for priority
let currentCategorySortOrder = 'asc'; // Default sort order for category
let isEditing = false;
let editIndex = null;
let filterMethod = 'all';

// Add icon - for add action
const addIcon = document.createElement('i');
addIcon.classList.add('fa-solid', 'fa-plus'); // Changed to 'fa-plus'

// Check icon - for update action
const checkIcon = document.createElement('i');
checkIcon.classList.add('fa-solid', 'fa-check');

// Display the remaining characters count out of 120
document.querySelector('.js-name-input').addEventListener('input', (e) => {
  let input = e.target.value;
  if (input.length > 120) {
    alert('Max character limit exceeded');
  }
});

// Date and time input handling
let dateCheck = false;
let timeCheck = false;

document.querySelector('.js-date-input').addEventListener('click', (e) => {
  e.preventDefault();
  if (!dateCheck) {
    e.target.showPicker();
    dateCheck = true;
  } else {
    dateCheck = false;
  }
});

document.querySelector('.js-date-input').addEventListener('blur', () => {
  dateCheck = false;
});

document.querySelector('.js-time-input').addEventListener('click', (e) => {
  e.preventDefault();
  if (!timeCheck) {
    e.target.showPicker();
    timeCheck = true;
  } else {
    timeCheck = false;
  }
});

document.querySelector('.js-time-input').addEventListener('blur', () => {
  timeCheck = false;
});

function clearInputs() {
  const inputNameElement = document.querySelector('.js-name-input');
  const inputDateElement = document.querySelector('.js-date-input');
  const inputTimeElement = document.querySelector('.js-time-input');
  const inputCategoryElement = document.querySelector('.js-category-input');
  const inputPriorityElement = document.querySelector('.js-priority-input');

  // Clear the inputs
  inputNameElement.value = '';
  inputDateElement.value = '';
  inputTimeElement.value = '';
  inputCategoryElement.value = '';
  inputPriorityElement.value = '';
  setDefaultDateTime(); // Ensure this function is defined
}

function addTodo() {
  const inputNameElement = document.querySelector('.js-name-input');
  const inputDateElement = document.querySelector('.js-date-input');
  const inputTimeElement = document.querySelector('.js-time-input');
  const inputCategoryElement = document.querySelector('.js-category-input');
  const inputPriorityElement = document.querySelector('.js-priority-input');

  let name = inputNameElement.value;
  let date = inputDateElement.value;
  let time = inputTimeElement.value;
  let category = inputCategoryElement.value;
  let priority = inputPriorityElement.value;

  // Validation checks
  if (!name || !date || !time || !category || !priority) {
    alert('Please fill in all fields: task, date, time, category, and priority.');
    return;
  }

  // Check that date is not in past
  if (date < inputDateElement.min) {
    alert('Please select the current date or a future date.');
    return;
  }

  // Check that time is not in past
  if (time < inputTimeElement.min && date === inputDateElement.min) {
    alert('Please select a future time.');
    return;
  }

  if (isEditing) {
    // Update the existing todo
    todoList[editIndex] = {
      name,
      date,
      time,
      category,
      priority,
      completed: false,
    }; 
    isEditing = false; 
    editIndex = null;

    // Change the button back to 'Add'
    const addButton = document.querySelector('.js-add-button');
    addButton.innerHTML = '';
    addButton.title = 'Add';
    addButton.appendChild(addIcon);

    // Hide cancel button
    const cancelEditBtn = document.querySelector('.js-cancel-button');
    cancelEditBtn.style.display = 'none';
  } else {
    // Add a new todo
    todoList.push({ name, date, time, category, priority, completed: false });
  }

  // Save to local storage
  localStorage.setItem('todoList', JSON.stringify(todoList));

  // Clear inputs after adding or editing
  clearInputs();
}
