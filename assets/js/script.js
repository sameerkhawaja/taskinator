var taskIdCounter = 0
var formEl = document.querySelector("#task-form")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content")

var taskFormHandler = function (event)
{
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskInputType = document.querySelector("select[name='task-type']").value

    if (!taskNameInput || !taskInputType)
    {
        alert("You need to fill out the task form!")
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskInputType
    }

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

}

var createTaskEl = function (taskDataObj)
{
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item"
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add list item
    var taskInfoEl = document.createElement("div")
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + " </span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add item to list
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

var createTaskActions = function (taskId)
{
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"

    var editButtonEl = document.createElement("button")
    editButtonEl.className = "btn edit-btn"
    editButtonEl.textContent = "Edit"
    editButtonEl.setAttribute("data-task-id", taskId)

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button")
    deleteButtonEl.className = "btn delete-btn"
    deleteButtonEl.textContent = "Delete"
    deleteButtonEl.setAttribute("data-task-id", taskId)

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++)
    {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);


    return actionContainerEl;

}

var taskButtonHandler = function (event)
{
    if (event.target.matches(".delete-btn"))
    {
        var taskId = event.target.getAttribute("data-task-id")
        deleteTask(taskId);
    }
}

var deleteTask = function (taskId)
{
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}'`)
    taskSelected.remove();
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);