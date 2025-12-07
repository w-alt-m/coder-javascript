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
        color: 'whitesmoke', showClass: {
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
    formSection.classList.toggle("show");
    taskInput.focus();
});

/* Mostrar tareas */
function renderTasks() {
    taskList.innerHTML = "";
    for (const task of tasks) {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "animate__animated", "animate__fadeIn", "animate__faster");
        li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions-container">
                    <select class="${task.id} options-dropdown form-select form-select-sm status-${task.status}" style="width: auto;">
                        <option value="1" ${task.status == 1 ? 'selected' : ''}>Pendiente</option>
                        <option value="2" ${task.status == 2 ? 'selected' : ''}>En progreso</option>
                        <option value="3" ${task.status == 3 ? 'selected' : ''}>Completada</option>
                    </select>
                    <button class="${task.id} btn-edit btn btn-sm">
                        <i class="bi bi-pencil-square pe-none"></i>
                    </button>
                    <button class="${task.id} btn-delete btn btn-sm">
                        <i class="bi bi-trash pe-none"></i>
                    </button>
                </div>
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
        tasks.push({ id: Date.now(), text: note, status: 1 });
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

/* Editar tarea */
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
        const id = e.target.classList[0]
        const task = tasks.find(task => task.id == id);
        Swal.fire({
            title: 'Editar tarea',
            input: 'text',
            inputValue: task.text,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            buttonsStyling: false,
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                input: 'swal-custom-input',
                confirmButton: 'btn btn-primary rounded-pill px-4 mx-2',
                cancelButton: 'btn btn-outline-secondary rounded-pill px-4 mx-2'
            },
            preConfirm: (text) => {
                task.text = text;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderTasks();
                toastMessage("Nota editada", '#007AFF');
            }
        })
    };
})

/* Editar estado */
taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("options-dropdown")) {
        const id = e.target.classList[0];
        const task = tasks.find(task => task.id == id);
        const selectedOption = e.target.value;
        task.status = selectedOption;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks()
    }
}); 
