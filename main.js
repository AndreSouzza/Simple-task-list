const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

const taskContainer = document.querySelector(".tasks-container")

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    if(!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemConteiner = document.createElement('div');
    taskItemConteiner.classList.add('task-item');

    const textContent = document.createElement('p');
    textContent.innerText = inputElement.value;

    textContent.addEventListener ('click', () => handleClick(textContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add("fa-trash-can");

    deleteItem.addEventListener ('click', () => handleDeleteClick (taskItemConteiner, textContent));

    taskItemConteiner.appendChild(textContent);
    taskItemConteiner.appendChild(deleteItem);

    taskContainer.appendChild(taskItemConteiner);

    inputElement.value = "";

    updateLocalStorage();
};

const handleClick = (textContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsClicked = task.firstChild.isSameNode(textContent);
        if (currentTaskIsClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }
    updateLocalStorage();
};

const handleDeleteClick = (taskItemConteiner, textContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsDeleted = task.firstChild.isSameNode(textContent)
        if (currentTaskIsDeleted);
        taskItemConteiner.remove();
    }
    updateLocalStorage();
};


const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;
  
    const localStorageTasks = [...tasks].map((task) => {
      const content = task.firstChild;
      const isCompleted = content.classList.contains("completed");
  
      return { description: content.innerText, isCompleted };
    });
  
    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
  };
  
  const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  
    if (!tasksFromLocalStorage) return;
  
    for (const task of tasksFromLocalStorage) {
      const taskItemContainer = document.createElement("div");
      taskItemContainer.classList.add("task-item");
  
      const taskContent = document.createElement("p");
      taskContent.innerText = task.description;
  
      if (task.isCompleted) {
        taskContent.classList.add("completed");
      }
  
      taskContent.addEventListener("click", () => handleClick(taskContent));
  
      const deleteItem = document.createElement("i");
      deleteItem.classList.add("far");
      deleteItem.classList.add("fa-trash-alt");
  
      deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent)
      );
  
      taskItemContainer.appendChild(taskContent);
      taskItemContainer.appendChild(deleteItem);
  
      taskContainer.appendChild(taskItemContainer);
    }
  };
  
  refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());