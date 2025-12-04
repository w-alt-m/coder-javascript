/* Importar elementos HTML */
const btnAdd = document.getElementById("btnAdd");
const formSection = document.getElementById("formSection");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

/* Swal Toast */
function toastMessage(message, bgColor = 'cornflowerblue') {
    Swal.fire({
        toast: true,
        title: `${message}`,
        position: 'top-end',
        width: 240,
        timer: 3000,
        showConfirmButton: false,
        background: bgColor,
        color: 'whitesmoke',
        showClass: {
            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
        },
    })
}

/* Botón de agregar tarea */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* Cargar tareas */
if (tasks.length > 0) {
    renderTasks()
} else {
    /* Cargar tareas por defecto */
    async function getData() {
        const response = await fetch("assets/data/defaultTasks.json");
        const data = await response.json();
        for (const task of data.defaultTasks) {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "example-task");
            li.innerHTML = `
            <span>${task.text}</span>
        `
            taskList.appendChild(li)
        }
    }
    getData()
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
        toastMessage("Nota agregada");
    }
})

/* Eliminar tarea */
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const id = e.target.classList[0]
        tasks = tasks.filter(task => task.id != id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        toastMessage("Nota eliminada", 'crimson');
    };
})

