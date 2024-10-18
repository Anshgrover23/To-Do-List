function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Your To-Do Tasks", 10, 10);
  
  const tasks = todoList.map(todo => ({
    title: todo.name,
    description: "",
    dueDate: todo.date,
    status: todo.completed ? "Completed" : "Pending"
  }));

  let y = 20;
  tasks.forEach(task => {
    doc.text(`${task.title} - Due: ${task.dueDate} - Status: ${task.status}`, 10, y);
    y += 10;
  });
  doc.save('todo-tasks.pdf');
}

function exportToCSV() {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "Title,Due Date,Status\n"
    + todoList.map(e => `${e.name},${e.date},${e.completed ? 'Completed' : 'Pending'}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "todo-tasks.csv");
  document.body.appendChild(link);
  link.click();
}

// Initialize the todo list and set default date and time on page load
document.addEventListener('DOMContentLoaded', () => {
  updateTodoList();
  setDefaultDateTime();

  const inputNameElement = document.querySelector('.js-name-input');
  inputNameElement.focus();

  const cancelEditBtn = document.querySelector('.js-cancel-button');
  cancelEditBtn.style.display = 'none';

  document.querySelector('.js-add-button').addEventListener('click', addTodo);
  document.querySelector('.js-cancel-button').addEventListener('click', cancelEditTodo);

  document.querySelector('.sort-button-category').addEventListener('click', () => sortTodos('category'));
  document.querySelector('.sort-button-priority').addEventListener('click', () => sortTodos('priority'));
  document.querySelector('.js-filter-input').addEventListener('change', filterTodos);
  
  // Add export buttons
  document.getElementById('export-pdf').addEventListener('click', exportToPDF);
  document.getElementById('export-csv').addEventListener('click', exportToCSV);
});
