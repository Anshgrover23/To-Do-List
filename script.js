function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Your To-Do Tasks", 10, 10);

  const tasks = todoList.map(todo => ({
    title: todo.name,
    dueDate: todo.date,
    status: todo.completed ? "Completed" : "Pending"
  }));

  let y = 20;
  tasks.forEach(task => {
    doc.text(task.title + " - Due: " + task.dueDate + " - Status: " + task.status, 10, y);
    y += 10;
  });
  doc.save('todo-tasks.pdf');
}

function exportToCSV() {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "Title,Due Date,Status\n"
    + todoList.map(e => e.name + "," + e.date + "," + (e.completed ? 'Completed' : 'Pending')).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "todo-tasks.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Clean up by removing the link after use
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

  // Check that date is not in the past
  const now = new Date();
  const selectedDate = new Date(date);
  if (selectedDate < now.setHours(0, 0, 0, 0)) {
    alert('Please select the current date or a future date.');
    return;
  }

  // Check that time is not in the past if the date is today
  if (selectedDate.toDateString() === now.toDateString() && new Date(`1970-01-01T${time}:00`) < new Date()) {
    alert('Please select a future time.');
    return;
  }

  // ... rest of the function
}
