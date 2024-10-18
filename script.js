document.addEventListener('DOMContentLoaded', () => {
  // Set the current year in the footer
  const currentYearElement = document.getElementById('current-year');
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;

  updateTodoList();
  setDefaultDateTime();

  // Set focus on the name input field
  const inputNameElement = document.querySelector('.js-name-input');
  inputNameElement.focus();

  // Hide edit cancel action button on page load
  const cancelEditBtn = document.querySelector('.js-cancel-button');
  cancelEditBtn.style.display = 'none';

  // Add event listeners to buttons
  document.querySelector('.js-add-button').addEventListener('click', addTodo);
  document.querySelector('.js-cancel-button').addEventListener('click', cancelEditTodo);

  // Add event listeners for sorting buttons
  document.querySelector('.sort-button-category').addEventListener('click', () => sortTodos('category'));
  document.querySelector('.sort-button-priority').addEventListener('click', () => sortTodos('priority'));

  // Add event listener for filter button
  document.querySelector('.js-filter-input').addEventListener('change', filterTodos);
});
