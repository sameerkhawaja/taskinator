var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event)
{
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskInputType = document.querySelector("select[name='task-type']").value

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"

    //create div to hold task info and add list item
    var taskInfoEl = document.createElement("div")
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskInputType + " </span>";

    listItemEl.appendChild(taskInfoEl);

    // add item to list
    tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", createTaskHandler)