const btnAdd = document.getElementById("btnAdd");
const formSection = document.getElementById("formSection");
const taskInput = document.getElementById("taskInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = ["hola", "123", "probando"];

/* Mostrar formulario */
btnAdd.addEventListener("click", () => {
    formSection.classList.toggle("d-none");
    taskInput.focus();
});

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