const btnAdd = document.getElementById("btnAdd");
const formSection = document.getElementById("formSection");
const taskInput = document.getElementById("taskInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
if (tasks.length > 0) {
    renderTasks()
}

/* Mostrar formulario */
btnAdd.addEventListener("click", () => {
    formSection.classList.toggle("d-none");
    taskInput.focus();
});

/* Mostrar tareas */
function renderTasks() {
    taskList.innerHTML = "";
    for (const task of tasks) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <span>${task}</span>
            <button class="btn btn-sm btn-danger">Eliminar</button>
        `
        taskList.appendChild(li)
    }
}

renderTasks();

/* Agregar tarea */

formSection.addEventListener("submit", (e) => {
    e.preventDefault();

    const note = taskInput.value.trim();

    if (note !== "") {
        tasks.push(note)
        taskInput.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
})

/* Eliminar tarea */