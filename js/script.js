{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({content: newTaskContent});
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeBtns = document.querySelectorAll(".js-removeTask");

        removeBtns.forEach((removeBtn, index) => {
            removeBtn.addEventListener("click", () => {
                removeTask(index);
            })
        });

        const toggleBtns = document.querySelectorAll(".js-toggleTask");

        toggleBtns.forEach((toggleBtn, index) => {
            toggleBtn.addEventListener("click", () => {
                toggleTask(index);
            })
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="taskList__item">
                    <button class="taskList__button taskList__button--done js-toggleTask">
                        ${task.done ? "✔️" : ""}
                    </button>
                    <span class="taskList__item--text">
                        ${task.content}
                    </span>
                    <button class="taskList__button taskList__button--remove js-removeTask">
                        🗑️
                    </button>
                </li>
            `;
        }

        const listElement = document.querySelector(".js-list");

        listElement.innerHTML = htmlString;

        bindEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-input");

        inputElement.focus();

        if (inputElement.value.trim()) {
            addNewTask(inputElement.value);
            inputElement.value = "";
        }
    }

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    }

    init();
}