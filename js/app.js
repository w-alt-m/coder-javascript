/* Importar elementos HTML */
const btnAdd = document.getElementById("btnAdd");
const formSection = document.getElementById("formSection");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

/* Botón de agregar tarea */
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
            <span>${task.text}</span>
            <button class="${task.id} btn-delete btn btn-sm btn-danger">Eliminar</button>
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
        tasks.push({ id: Date.now(), text: note })
        taskInput.value = "";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
})

/* Eliminar tarea */
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const id = e.target.classList[0]
        tasks = tasks.filter(task => task.id != id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

})

