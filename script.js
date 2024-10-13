let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
let todoListhtml = '';
let currentSortMethod = 'date'; // Default sort method
let currentSortOrder = 'asc'; // Default sort order for priority
let currentCategorySortOrder = 'asc'; // Default sort order for category

let isEditing = false;
let editIndex = null;

let filterMethod = 'all';

// Display the remaining characters count out of 120
document.querySelector('.js-name-input').addEventListener('input', (e) => {
  let input = e.target.value;
  if (input.length === 120) {
    alert('max character limits exceeded');
  }
});

function addTodo() {
  const inputNameElement = document.querySelector('.js-name-input');
  const inputDateElement = document.querySelector('.js-date-input');
  const inputTimeElement = document.querySelector('.js-time-input');
  const inputCategoryElement = document.querySelector('.js-category-input');
  const inputPriorityElement = document.querySelector('.js-priority-input');

  let name = inputNameElement.value;
  let date = inputDateElement.value || getCurrentDate(); // Use the default date if not provided
  let time = inputTimeElement.value || getCurrentTime(); // Use the default time if not provided
  let category = inputCategoryElement.value;
  let priority = inputPriorityElement.value;

  // Validation checks
  if (!name || !date || !time || !category || !priority) {
    alert('Please fill in all fields: task, date, time, category, and priority.');
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
    isEditing = false; // Reset edit mode
    editIndex = null;

    // Change the button back to 'Add'
    const addButton = document.querySelector('.js-add-button');
    addButton.innerHTML = '<i class="fa-solid fa-add"></i>';
  } else {
    // Add a new todo
    todoList.push({ name, date, time, category, priority, completed: false });
  }

  // Save to localStorage
  localStorage.setItem('todoList', JSON.stringify(todoList));

  // Clear the inputs
  inputNameElement.value = '';
  inputDateElement.value = getCurrentDate();
  inputTimeElement.value = getCurrentTime();
  inputCategoryElement.value = '';
  inputPriorityElement.value = '';
  
  // Update the displayed list and task count
  updateTodoList();
  updateTaskCount();
  showSuccessNotification();
}

function deleteTodo(index) {
  // Remove the specific todo from the list
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));

  // Update the displayed list and task count
  updateTodoList();
  updateTaskCount();
}

function editTodo(index) {
  let inputNameElement = document.querySelector('.js-name-input');
  let inputDateElement = document.querySelector('.js-date-input');
  let inputTimeElement = document.querySelector('.js-time-input');
  let inputCategoryElement = document.querySelector('.js-category-input');
  let inputPriorityElement = document.querySelector('.js-priority-input');

  // Fill the input fields with the current values
  inputNameElement.value = todoList[index].name;
  inputDateElement.value = todoList[index].date;
  inputTimeElement.value = todoList[index].time;
  inputCategoryElement.value = todoList[index].category;
  inputPriorityElement.value = todoList[index].priority;

  // Set editing mode and the index of the todo being edited
  isEditing = true;
  editIndex = index;

  // Change the add button to 'Update'
  const addButton = document.querySelector('.js-add-button');
  addButton.innerHTML = 'Update';
}

function updateTaskCount() {
  // Get the total and completed task count
  const totalTasks = todoList.length;
  const completedTasks = todoList.filter(todo => todo.completed).length;
  document.getElementById('totalTasks').textContent = totalTasks;
  document.getElementById('completedTasks').textContent = completedTasks;
}

function updateTodoList() {
  // Sort and filter todo list based on selected options
  let filteredTodos = todoList;

  // Apply filtering based on the selected filter method
  if (filterMethod === 'pending') {
    filteredTodos = todoList.filter((todo) => !todo.completed);
  } else if (filterMethod === 'completed') {
    filteredTodos = todoList.filter((todo) => todo.completed);
  }

  filteredTodos.sort((a, b) => {
    if (currentSortMethod === 'date') {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA - dateB;
    } else if (currentSortMethod === 'category') {
      return currentCategorySortOrder === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    } else if (currentSortMethod === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return currentSortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });

  const addElement = document.querySelector('.js-add-html');
  todoListhtml = '';

  for (let i = 0; i < filteredTodos.length; i++) {
    const todo = filteredTodos[i];
    todoListhtml += `
      <div class="small-container ${todo.completed ? 'completed' : ''}">
        <input type="checkbox" class="js-complete-checkbox" data-index="${i}" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todoList.indexOf(todo)})">
        <div class="task-info">
          <span class="task-name">${todo.name}</span>
          <span class="category-tag">${todo.category}</span>
          <span class="priority-tag priority-${todo.priority}">${todo.priority}</span>
        </div>
      </div>
      <div class="small-container">${todo.date}</div>
      <div class="small-container">${todo.time}</div>
      <button class="js-delete-button" data-index="${i}">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="js-edit-button" data-index="${i}">
        <i class="fa-solid fa-pen"></i>
      </button>`;
  }

  if (todoList.length === 0) {
    addElement.style.display = 'none';
  } else {
    addElement.style.display = 'grid';
    addElement.innerHTML = todoListhtml;
  }

  // Add event listeners for delete and edit buttons
  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      deleteTodo(index);
    });
  });

  document.querySelectorAll('.js-edit-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.getAttribute('data-index');
      editTodo(index);
    });
  });
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  updateTodoList();
  updateTaskCount();
}

function setDefaultDateTime() {
  const inputDateElement = document.querySelector('.js-date-input');
  const inputTimeElement = document.querySelector('.js-time-input');

  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].slice(0, 5);

  inputDateElement.value = date;
  inputDateElement.min = date; // Set the min attribute to today's date
  inputTimeElement.value = time;
}

function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // Returns the date in yyyy-mm-dd format
}

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().split(' ')[0].slice(0, 5); // Returns the time in hh:mm format
}

function sortTodos(sortBy) {
  if (sortBy === 'priority') {
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
  } else if (sortBy === 'category') {
    currentCategorySortOrder = currentCategorySortOrder === 'asc' ? 'desc' : 'asc';
  }
  currentSortMethod = sortBy;
  updateTodoList();
}

function filterTodos() {
  filterMethod = document.querySelector('.js-filter-input').value;
  updateTodoList();
}

function showSuccessNotification() {
  const notificationElement = document.getElementById('js-success-notification');
  notificationElement.style.display = 'block';

  setTimeout(function () {
    notificationElement.style.display = 'none';
  }, 2000);
}

// Initial call to display the saved todos on page load
updateTodoList();
updateTaskCount();
setDefaultDateTime();

// Add event listener for the add button
document.querySelector('.js-add-button').addEventListener('click', addTodo);
