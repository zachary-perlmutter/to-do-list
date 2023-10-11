// Define variables and get references to elements

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage when the page loads

window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    addTask(task.text, task.completed); // Call addTask with the loaded task text
  });
});

// Implement adding tasks

function addTask(taskText, isCompleted = false) {
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    // Check if the task was previously marked as completed
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (isCompleted) {
      taskItem.classList.add("completed");
    }

    taskList.appendChild(taskItem);
  }
}

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  addTask(taskText); // Call addTask with the entered task text
  taskInput.value = "";

  // Save tasks to local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = { text: taskText, completed: false }; // New task is not completed initially
  storedTasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
});

// Implement marking tasks as completed

function toggleTaskCompletion(event) {
  const taskItem = event.target;

  if (taskItem.tagName === "LI") {
    taskItem.classList.toggle("completed");
  }
}

// Implement deleting tasks

function deleteTask(event) {
  const taskItem = event.target;

  if (taskItem.tagName === "LI") {
    taskItem.remove();
  }

  // Remove the task from local storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskText = taskItem.textContent;
  const updatedTasks = storedTasks.filter((text) => text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

taskList.addEventListener("click", toggleTaskCompletion);
taskList.addEventListener("dblclick", deleteTask);
