
//closure
function init() {

  var taskInput = document.getElementById("new-task");
  var addButton = document.getElementsByTagName("button")[0];
  var incompleteTasksHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");

  function nodeIndex(el) {
    var i = 0;
    while (el.previousElementSibling) {
      el = el.previousElementSibling;
      i++;
    }
    return i;
  }

//  load task 

  var loadTasks = function () {

    var ichild = incompleteTasksHolder.lastElementChild;
    while (ichild) {
      incompleteTasksHolder.removeChild(ichild);
      ichild = incompleteTasksHolder.lastElementChild;
    }

    var incompleteTasks = localStorage.getItem('incompleteTasksHolder');
    var currentIcTasks = [];
    if (incompleteTasks) {
      currentIcTasks = JSON.parse(incompleteTasks);
    }

    if (currentIcTasks.length) {
      currentIcTasks.forEach((taskString, index) => {
        var listItem = createNewTaskElement(taskString, "" + index);
        bindTaskEvents(listItem, taskCompleted);
        incompleteTasksHolder.appendChild(listItem);
      });
    }

    var cchild = completedTasksHolder.lastElementChild;
    while (cchild) {
      completedTasksHolder.removeChild(cchild);
      cchild = completedTasksHolder.lastElementChild;
    }

    var completeTasks = localStorage.getItem('completeTasksHolder');
    var currentCTasks = [];
    if (completeTasks) {
      currentCTasks = JSON.parse(completeTasks);
    }

    if (currentCTasks.length) {
      currentCTasks.forEach((taskString, index) => {
        var listItem = createNewTaskElement(taskString, "" + index);
        bindTaskEvents(listItem, taskIncomplete);
        completedTasksHolder.appendChild(listItem);
      });
    }
  }
  //create new task
  var createNewTaskElement = function (taskString, id) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    checkBox.tabindex = id;

    listItem.id = id || "";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  
  // add task

  var addTask = function (e) {
    e.preventDefault();
    if (taskInput.value === "") {
      alert("please fill in following field")
    } else {
      var listItemName = taskInput.value || "New Item"
      var tasks = localStorage.getItem('incompleteTasksHolder');
      var oldTasks = [];
      if (tasks) {
        oldTasks = JSON.parse(tasks);
      }
      var newTasks = oldTasks.concat(listItemName);
      localStorage.setItem('incompleteTasksHolder', JSON.stringify(newTasks));

      listItem = createNewTaskElement(listItemName, "" + (newTasks.length - 1))
      incompleteTasksHolder.appendChild(listItem)
      bindTaskEvents(listItem, taskCompleted)
      taskInput.value = "";

    }
  };

  //edit task

  var editTask = function (el) {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];
    var updateElement = editInput.value;


    var ul = listItem.parentNode;
    var indexToEdit = listItem.id;


    if (ul.id == "completed-tasks") {
      let data = JSON.parse(localStorage.getItem('completeTasksHolder'));
      data.splice(indexToEdit, 1, updateElement)
      localStorage.setItem("completeTasksHolder", JSON.stringify(data))

    } else {
      let data = JSON.parse(localStorage.getItem('incompleteTasksHolder'));
      data.splice(indexToEdit, 1, updateElement)
      localStorage.setItem("incompleteTasksHolder", JSON.stringify(data))
    }

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
      label.innerText = editInput.value
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText
      button.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
  };

  //delete task


  var deleteTask = function (el) {
    var listItem = this.parentNode;

    var ul = listItem.parentNode;
    var indexToRemove = listItem.id;

    if (ul.id == "completed-tasks") {
      let data = JSON.parse(localStorage.getItem('completeTasksHolder'));
      data.splice(indexToRemove, 1);
      localStorage.setItem('completeTasksHolder', JSON.stringify(data));
      ul.removeChild(listItem);
    } else {
      let data = JSON.parse(localStorage.getItem('incompleteTasksHolder'));
      data.splice(indexToRemove, 1);
      localStorage.setItem('incompleteTasksHolder', JSON.stringify(data));
      ul.removeChild(listItem);
    }
    loadTasks();
  };

  // completed task

  var taskCompleted = function (el) {

    var listItem = this.parentNode;
    var indexToMove = nodeIndex(el);

    var incompletedTasks = JSON.parse(localStorage.getItem('incompleteTasksHolder'));
    var completedTasks = JSON.parse(localStorage.getItem('completeTasksHolder'));

    if (completedTasks && completedTasks.length) {
      completedTasks.push(incompletedTasks[indexToMove]);
    } else {
      completedTasks = [incompletedTasks[indexToMove]];
    }

    incompletedTasks.splice(indexToMove, 1);
    localStorage.setItem('incompleteTasksHolder', JSON.stringify(incompletedTasks));
    localStorage.setItem('completeTasksHolder', JSON.stringify(completedTasks));

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

  };

  //inComplete task 
 
  var taskIncomplete = function (el) { 
    var listItem = this.parentNode;
    var indexToMove = nodeIndex(el);

    var incompletedTasks = JSON.parse(localStorage.getItem('incompleteTasksHolder'));
    var completedTasks = JSON.parse(localStorage.getItem('completeTasksHolder'));

    if (incompletedTasks && incompletedTasks.length) {
      incompletedTasks.push(completedTasks[indexToMove]);
    } else {
      incompletedTasks = [completedTasks[indexToMove]]; 
    } 

    completedTasks.splice(indexToMove, 1); 
    localStorage.setItem('completeTasksHolder', JSON.stringify(completedTasks));
    localStorage.setItem('incompleteTasksHolder', JSON.stringify(incompletedTasks));

    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };



  var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };
 
  addButton.addEventListener("click", addTask);

  for (var i = 0;i < incompleteTasksHolder.children.length;i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (var i = 0;i < completedTasksHolder.children.length;i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

  loadTasks();

}

init();
