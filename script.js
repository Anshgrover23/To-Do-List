function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed;
  if (todoList[index].completed) {
      successNotification();
  }
  localStorage.setItem('todoList', JSON.stringify(todoList));
  updateTodoList();
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
  if (new Date(date) < new Date()) {
      alert('Please select the current date or a future date.');
      return;
  }

  // Check that time is not in past
  if (new Date(date + ' ' + time) < new Date()) {
      alert('Please select a future time.');
      return;
  }

  // Continue with adding/updating logic...
}

function updateTodoList() {
  // Sort and filter logic...
  
  // Render the updated todo list
  const addElement = document.querySelector('.js-add-html');
  todoListhtml = '';

  for (let i = 0; i < filteredTodos.length; i++) {
      const todo = filteredTodos[i];
      todoListhtml += `
          <div class="small-container ${todo.completed ? 'completed' : ''}">
              <input type="checkbox" class="js-complete-checkbox" data-index="${i}" ${todo.completed ? 'checked' : ''}>
              <div class="task-info">
                  <span class="task-name">${todo.name}</span>
                  <span class="category-tag">${todo.category}</span>
                  <span class="priority-tag priority-${todo.priority}">${todo.priority}</span>
              </div>
              <button class="js-delete-button" data-index="${todoList.indexOf(todo)}"><i class="fa-solid fa-trash"></i></button>
              <button class="js-edit-button" data-index="${todoList.indexOf(todo)}"><i class="fa-solid fa-pen"></i></button>
          </div>
          <div class="small-container">${todo.date}</div>
          <div class="small-container">${todo.time}</div>`;
  }

  addElement.style.display = todoList.length === 0 ? 'none' : 'grid';
  addElement.innerHTML = todoListhtml;

  // Use event delegation for buttons
  addElement.addEventListener('click', (event) => {
      if (event.target.closest('.js-delete-button')) {
          const index = event.target.closest('.js-delete-button').getAttribute('data-index');
          deleteTodo(index);
      }
      if (event.target.closest('.js-edit-button')) {
          const index = event.target.closest('.js-edit-button').getAttribute('data-index');
          editTodo(index);
      }
  });
}
