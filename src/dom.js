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
    const dialog = document.getElementById("new-task-dialog");
    const form = document.getElementById("new-task-form");
    container.innerText = "";

    const title = document.createElement("h2");
    title.textContent = "Inbox";
    container.appendChild(title);

    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.id = "add-task-button";
    container.appendChild(addButton);
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });

    const cancelButton = document.getElementById("cancel");
    cancelButton.addEventListener("click", () => {
        dialog.close();
        form.reset();
    })
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