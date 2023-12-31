var taskIdCounter = 0;
var tasks =[];
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function (event)
{
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskInputType = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskInputType)
    {
        alert("You need to fill out the task form!")
        return false;
    }

    formEl.reset();
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;


    var isEdit = formEl.hasAttribute("data-task-id");

    if(isEdit)
    {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskInputType, taskId);
    }
    else
    {
        // package up data as an object
        var taskDataObj = {
            id: taskIdCounter,
            name: taskNameInput,
            type: taskInputType,
            status: "to do"
        }

        // send it as an argument to createTaskEl
        createTaskEl(taskDataObj);
    }
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
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    switch (taskDataObj.status) {
        case "to do":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0
            tasksToDoEl.appendChild(listItemEl);
            break;
        case "in progress":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1
            tasksInProgressEl.appendChild(listItemEl);
            break;
        case "completed":
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
            tasksCompletedEl.appendChild(listItemEl);
            break;
    }

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    saveTasks();

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

    for (let i = 0; i < statusChoices.length; i++)
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

    if (event.target.matches(".edit-btn"))
    {
        var taskId = event.target.getAttribute("data-task-id")
        editTask(taskId);
    }
    else if (event.target.matches(".delete-btn"))
    {
        var taskId = event.target.getAttribute("data-task-id")
        deleteTask(taskId);
    }
}

var taskStatusChangeHandler = function (event){
    var taskId = event.target.getAttribute("data-task-id")
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if (statusValue === "to do"){
        tasksToDoEl.appendChild(taskSelected)
    }
    else if (statusValue === "in progress"){
        tasksInProgressEl.appendChild(taskSelected)
    }
    else if (statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected)
    }

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue
        }
    }
    saveTasks();
    
}

var deleteTask = function (taskId)
{
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}'`)
    taskSelected.remove();

    updatedTasksArr =[];
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)){
            tasks.splice(i, 1)
        }
    }
    
    saveTasks();
}

var editTask = function(taskId){
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id",taskId)
}

var completeEditTask = function (taskNameInput, taskTypeInput, taskId)
{
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`)

    taskSelected.querySelector("h3.task-name").textContent = taskNameInput;
    taskSelected.querySelector("span.task-type").textContent = taskTypeInput;

    for (let i=0; i<tasks.length;i++)
    {
        if (tasks[i] === parseInt(taskId))
        {
            tasks[i].name = taskNameInput;
            tasks[i].type = taskTypeInput;
        }
    };

    alert("Task Updated!")
    saveTasks();
    
    formEl.removeAttribute("data-task-id")
    document.querySelector("#save-task").textContent = "Add Task";
}

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function(){
    savedTasks = localStorage.getItem("tasks");
    
    if (savedTasks === null)
    {
        return false;
    }

    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach(savedTask => {
        createTaskEl(savedTask)
    });
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();