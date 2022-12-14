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
                toggleBtn.textContent = toggleBtn.textContent === "🟩" ? "✅" : "🟩";
            })
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item">
                    <button class="tasks__button tasks__button--done js-toggleTask">🟩</button>
                    ${task.content}
                    <button class="tasks__button tasks__button--delete js-removeTask">🗑️</button>
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