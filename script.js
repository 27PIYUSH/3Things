document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Fetch tasks from localStorage or initialize an empty array

  tasks.forEach((task) => renderTask(task)); // Render tasks when page is loaded

  // Add task on button click
  addTaskBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask); // Render the new task in the UI
    todoInput.value = ""; // clear input

    // console.log(tasks);
  });

  // Add task on pressing Enter key
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const taskText = todoInput.value.trim();
      if (taskText === "") return;

      const newTask = {
        id: Date.now(), // Unique ID for each task
        text: taskText,
        completed: false,
      };

      tasks.push(newTask);
      saveTask();
      renderTask(newTask);
      todoInput.value = "";
    }
  });

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //store the task arr into our local storage
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click event from bubbling up
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    todoList.appendChild(li);
  }
});
