export function addEventListeners() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const sidebarButtons = document.querySelectorAll(".sidebar-button");

    menuButton.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
    });

    sidebarButtons.forEach(btn => 
        btn.addEventListener("click", () => {
            if (!btn.classList.contains("selected")) {
                const selectedBtn = document.querySelector(".sidebar-button.selected");
                selectedBtn.classList.remove("selected");
                btn.classList.add("selected");

                const currentPage = btn.id.split("-")[0];
                renderPage(currentPage);
            }
    }));
};

export function renderPage(currentPage) {
    if (currentPage === "inbox") renderInboxPage();
    if (currentPage === "today") renderTodayPage();
    if (currentPage === "week") renderWeekPage();
};

function renderInboxPage() {
    const container = document.getElementById("todo-container");
    container.innerText = "";

    const title = document.createElement("h2");
    title.textContent = "Inbox";
    container.appendChild(title);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "add-task-button";
    container.appendChild(addButton);

    const newTaskDialog = document.createElement("dialog");
    const newTaskForm = document.createElement("form");
    newTaskForm.method = "dialog";

    const leftContainer = document.createElement("div");
    const rightContainer = document.createElement("div");
    leftContainer.id = "left-container";
    rightContainer.id = "right-container;"

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.id = "name-input";
    nameInput.placeholder = "Name";
    newTaskForm.appendChild(nameInput);

    const descInput = document.createElement("textArea");
    descInput.name = "description";
    descInput.id = "desc-input";
    descInput.placeholder = "Description (optional)";
    newTaskForm.appendChild(descInput);

    leftContainer.appendChild(nameInput);
    leftContainer.appendChild(descInput);

    const prioContainer = document.createElement("fieldset");
    const prioLabel = document.createElement("legend");
    prioLabel.textContent = "Priority";

    const lowContainer = document.createElement("div");

    const lowButton = document.createElement("button");
    lowButton.type = "radio";
    lowButton.name = "priority";
    lowButton.value = "low";
    lowButton.id = "low;"

    const lowLabel = document.createElement("label");
    lowLabel.htmlFor = "low";
    lowLabel.textContent = "Low";

    lowContainer.appendChild(lowButton);
    lowContainer.appendChild(lowLabel);

    const medContainer = document.createElement("div");

    const medButton = document.createElement("button");
    medButton.type = "radio";
    medButton.name = "priority";
    medButton.value = "medium";
    medButton.id = "medium";

    const medLabel = document.createElement("label");
    medLabel.htmlFor = "medium";
    medLabel.textContent = "Medium";

    medContainer.appendChild(medButton);
    medContainer.appendChild(medLabel);

    const highContainer = document.createElement("div");

    const highButton = document.createElement("button");
    highButton.type = "radio";
    highButton.name = "priority";
    highButton.value = "high";
    highButton.id = "high";

    const highLabel = document.createElement("label");
    highLabel.htmlFor = "high";
    highLabel.textContent = "High";

    highContainer.appendChild(highButton);
    highContainer.appendChild(highLabel);

    rightContainer.appendChild(prioLabel);
    rightContainer.appendChild(lowContainer);
    rightContainer.appendChild(medContainer);
    rightContainer.appendChild(highContainer);

    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "due-date";
    dateLabel.textContent = "Due Date:";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "due-date";
    dateInput.name = "due-date";

    rightContainer.appendChild(dateLabel);
    rightContainer.appendChild(dateInput);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttons-container";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Task";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", () => {
        newTaskDialog.close();
        newTaskForm.reset();
    })

    buttonsContainer.appendChild(submitButton);
    buttonsContainer.appendChild(cancelButton);

    newTaskForm.appendChild(leftContainer);
    newTaskForm.appendChild(rightContainer);
    newTaskForm.appendChild(buttonsContainer);

    newTaskDialog.appendChild(newTaskForm);
    container.appendChild(newTaskDialog);

    addButton.addEventListener("click", () => {
        newTaskDialog.showModal();
    });
};

function renderTodayPage() {
    const container = document.getElementById("todo-container");
    container.innerText = "";
    const title = document.createElement("h2");
    title.textContent = "Today";
    container.appendChild(title);
};

function renderWeekPage() {
    const container = document.getElementById("todo-container");
    container.innerText = "";
    const title = document.createElement("h2");
    title.textContent = "This Week";
    container.appendChild(title);
};