var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event)
{
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.textContent = "my task";
    listItemEl.className = "task-item"
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler)