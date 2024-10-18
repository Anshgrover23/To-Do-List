let todoList = [];
try {
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];
} catch (e) {
  console.error("Error parsing todoList from localStorage:", e);
}

let currentSortMethod = 'date';
let currentSortOrder = 'asc';
let currentCategorySortOrder = 'asc';
let isEditing = false;
let editIndex = null;
let filterMethod = 'all';

// DOM Elements
const inputNameElement = document.querySelector('.js-name-input');
const inputDateElement = document.querySelector('.js-date-input');
const inputTimeElement = document.querySelector('.js-time-input');
const inputCategoryElement = document.querySelector('.js-category-input');
const inputPriorityElement = document.querySelector('.js-priority-input');
const addButton = document.querySelector('.js-add-button');
const cancelEditBtn = document.querySelector('.js-cancel-button');
const filterElement = document.querySelector('.js-filter-input');
const addElement = document.querySelector('.js-add-html');
const successNotificationElement = document.getElementById('js-success-notification');

document.addEventListener('DOMContentLoaded', () => {
  updateTodoList();
  setDefaultDateTime();
  inputNameElement.focus();
  cancelEditBtn.style.display = 'none';

  addButton.addEventListener('click', addTodo);
  cancelEditBtn.addEventListener('click', cancelEditTodo);
  document.querySelector('.sort-button-category').addEventListener('click', () => sortTodos('category'));
  document.querySelector('.sort-button-priority').addEventListener('click', () => sortTodos('priority'));
  filterElement.addEventListener('change', filterTodos);
});

// Display remaining characters count
inputNameElement.addEventListener('input', (e) => {
  const remaining = 120 - e.target.value.length;
  if (remaining < 0) {
    // Show warning in UI instead of alert
    document.querySelector('.char-count-warning').textContent = 'Max character limit exceeded';
  } else {
    document.querySelector('.char-count-warning').textContent = `${remaining} characters remaining`;
  }
});

// Rest of your functions...

function updateTodoList() {
  let filteredTodos = todoList;

  if (filterMethod === 'pending') {
    filteredTodos = todoList.filter((todo) => !todo.completed);
  } else if (filterMethod === 'completed') {
    filteredTodos = todoList.filter((todo) => todo.completed);
  }

  // Sorting Logic...
  
  // Render todos...
}

// Add event delegation for edit and delete buttons
addElement.addEventListener('click', (event) => {
  if (event.target.matches('.js-delete-button')) {
    const index = event.target.getAttribute('data-index');
    deleteTodo(index);
  } else if (event.target.matches('.js-edit-button')) {
    const index = event.target.getAttribute('data-index');
    editTodo(index);
  }
});
