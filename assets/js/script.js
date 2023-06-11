buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do")

var createTaskHandler = function ()
{
    var taskListEle = document.createElement("li");
    taskListEle.textContent = "my task";
    taskListEle.className = "task-item"
    tasksToDoEl.appendChild(taskListEle);
}

buttonEl.addEventListener("click", createTaskHandler)