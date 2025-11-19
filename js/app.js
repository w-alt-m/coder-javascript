const btnAdd = document.getElementById("btnAdd");
const formSection = document.getElementById("formSection");
const taskInput = document.getElementById("taskInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

btnAdd.addEventListener("click", () => {
    formSection.classList.toggle("d-none");
    taskInput.focus();
});