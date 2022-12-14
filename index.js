{
    const formElement = document.querySelector(".js-form");
    const inputElement = document.querySelector(".js-input");
    const listElement = document.querySelector(".js-list");

    const tasks = [
        {
            content: "zadanie 1",
            done: false,
        },
        {
            content: "zadanie 2",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({content: newTaskContent});
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTask = (taskIndex) => {
        tasks[taskIndex].content
        render();
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

        listElement.innerHTML = htmlString;

        const removeBtns = document.querySelectorAll(".js-removeTask");

        removeBtns.forEach((removeBtn, index) => {
            removeBtn.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleBtns = document.querySelectorAll(".js-toggleTask");

        toggleBtns.forEach((toggleBtn, index) => {
            toggleBtn.addEventListener("click", () => {
                toggleBtn.textContent = toggleBtn.textContent === "🟩" ? "✅" : "🟩";
            })
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (inputElement.value.trim()) {
            addNewTask(inputElement.value);
            inputElement.value = "";
        }

        // render();
    }

    const init = () => {
        render();

        formElement.addEventListener("submit", onFormSubmit);

        // taskDoneBtn.addEventListener("click", () => {
        

        // })
    }

    init();
}