{
  let tasks = [];
  let doneTasksHidden = false;
  let allTasksCompleted = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTask = (taskIndex) => {
    const newDoneValue = !tasks[taskIndex].done;
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: newDoneValue },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const completeAllTasks = () => {
    tasks.forEach((task, index) => {
      !task.done && toggleTask(index);
    });
    render();
  };

  const bindRemoveEvents = () => {
    const removeBtns = document.querySelectorAll(".js-removeTask");

    removeBtns.forEach((removeBtn, index) => {
      removeBtn.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindToggleEvents = () => {
    const toggleBtns = document.querySelectorAll(".js-toggleTask");

    toggleBtns.forEach((toggleBtn, index) => {
      toggleBtn.addEventListener("click", () => {
        toggleTask(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    if (tasks[0]) {
      if (!allTasksCompleted) {
        const completeAllTasksBtn = document.querySelector(
          ".js-completeAllTasks"
        );

        completeAllTasksBtn.addEventListener("click", () => {
          completeAllTasks();
        });
      }

      const hideCompletedTasksBtn = document.querySelector(
        ".js-hideCompletedTasks"
      );

      hideCompletedTasksBtn.addEventListener("click", () => {
        doneTasksHidden = !doneTasksHidden;
        render();
      });
    }
  };

  const renderButtons = () => {
    let htmlString = "";

    if (tasks[0]) {
      htmlString += `
                <button class="section__headerButton js-hideCompletedTasks">
                    ${doneTasksHidden ? "Show completed" : "Hide completed"}
                </button>
                <button class="section__headerButton js-completeAllTasks" ${
                  allTasksCompleted ? "disabled" : ""
                }>
                    Complete all
                </button>
            `;
    }

    document.querySelector(".js-headerBtns").innerHTML = htmlString;
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
                <li class="taskList__item ${
                  task.done && doneTasksHidden ? "hideElement" : ""
                }">
                    <button class="taskList__button taskList__button--done js-toggleTask">
                        ${task.done ? "✔️" : ""}
                    </button>
                    <span class="taskList__item--text js-taskListText ${
                      task.done ? "taskList__item--textCrossed" : ""
                    }">
                        ${task.content}
                    </span>
                    <button class="taskList__button taskList__button--remove js-removeTask">
                        🗑️
                    </button>
                </li>
            `;
    }

    document.querySelector(".js-list").innerHTML = htmlString;
  };

  const render = () => {
    allTasksCompleted = tasks.every((task) => task.done === true);

    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindToggleEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const inputElement = document.querySelector(".js-input");

    inputElement.focus();

    if (inputElement.value.trim()) {
      addNewTask(inputElement.value);
      inputElement.value = "";
    }
  };

  const init = () => {
    render();

    const formElement = document.querySelector(".js-form");
    formElement.addEventListener("submit", onFormSubmit);
  };

  init();
}
