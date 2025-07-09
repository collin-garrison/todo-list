export function addEventListeners() {
    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");
    const sidebarButtons = document.querySelectorAll(".sidebar-button");
    const dialog = document.getElementById("new-task-dialog");
    const form = document.getElementById("new-task-form");
    const cancelButton = document.getElementById("cancel");

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

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get("name");
        const description = formData.get("description");
        const priority = formData.get("priority");
        const dueDateStr = formData.get("due-date");

        if (!name.trim()) {
            alert("Name cannot be empty");
        } else if (!priority) {
            alert("Must select priority level");
        } else if (!dueDateStr) {
            alert("Must select a due date");
        } else {
            const dueDate = new Date(dueDateStr);
            const today = new Date();
            dueDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            if (dueDate < today) {
                alert("Due date must be in the future");
            } else {
                // do something with data
                form.reset();
                dialog.close();
            };
        };
    });

    cancelButton.addEventListener("click", () => {
        dialog.close();
        form.reset();
    });
};

export function renderPage(currentPage) {
    if (currentPage === "inbox") renderInboxPage();
    if (currentPage === "today") renderTodayPage();
    if (currentPage === "week") renderWeekPage();
};

function renderInboxPage() {
    const container = document.getElementById("todo-container");
    const dialog = document.getElementById("new-task-dialog");
    const form = document.getElementById("new-task-form");
    container.innerText = "";

    const title = document.createElement("h2");
    title.textContent = "Inbox";
    container.appendChild(title);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "add-task-button";
    addButton.classList.add("simple-button");
    container.appendChild(addButton);
    addButton.addEventListener("click", () => {
        dialog.showModal();
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