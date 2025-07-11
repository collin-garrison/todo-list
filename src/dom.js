import { addTodo, getTodos } from "./todo-list";

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
        let name = formData.get("name");
        let description = formData.get("description");
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
                name = name.trim();
                description = description?.trim() || "";
                addTodo(name, description, priority, dueDateStr);
                form.reset();
                dialog.close();
                renderTodoList();
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

function renderTodoList() {
    const container = document.getElementById("todo-container");
    container.textContent = "";

    const todos = getTodos();
    todos.forEach(todo => {
        const div = document.createElement("div");
        div.classList.add("todo-item");

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.classList.add("todo-complete-button");
        div.appendChild(completeButton);

        const name = document.createElement("p");
        name.textContent = todo.name;
        name.classList.add("todo-name")
        name.title = name.textContent;z
        div.appendChild(name);

        const description = document.createElement("p");
        description.textContent = todo.description === "" ? "No description" : todo.description;
        description.classList.add("todo-description");
        description.title = description.textContent;
        div.appendChild(description);

        const priority = document.createElement("p");
        priority.textContent = todo.priority;
        priority.classList.add(`todo-priority-${todo.priority.toLowerCase()}`);
        div.appendChild(priority);

        const dueDate = document.createElement("p");
        dueDate.textContent = todo.dueDate;
        dueDate.classList.add("todo-date");
        div.appendChild(dueDate);

        container.appendChild(div);
    });
}

function renderInboxPage() {
    const container = document.getElementById("content");
    const dialog = document.getElementById("new-task-dialog");
    container.innerText = "";

    const title = document.createElement("h2");
    title.textContent = "Inbox";
    container.appendChild(title);

    const todoTitlesContainer = document.createElement("div");
    todoTitlesContainer.id = "todo-titles-container";
    const completeTitle = document.createElement("h3");
    completeTitle.textContent = "✓";
    const nameTitle = document.createElement("h3");
    nameTitle.textContent = "Name";
    const descTitle = document.createElement("h3");
    descTitle.textContent = "Description";
    const priorityTitle = document.createElement("h3");
    priorityTitle.textContent = "Priority";
    const dueDateTitle = document.createElement("h3");
    dueDateTitle.textContent = "Due Date";
    todoTitlesContainer.appendChild(completeTitle);
    todoTitlesContainer.appendChild(nameTitle);
    todoTitlesContainer.appendChild(descTitle);
    todoTitlesContainer.appendChild(priorityTitle);
    todoTitlesContainer.appendChild(dueDateTitle);
    container.appendChild(todoTitlesContainer);

    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";
    container.appendChild(todoContainer);

    const today = new Date();
    addTodo("Add a task", "Use the button below to add a new task", "medium", today);
    renderTodoList();

    const addButton = document.createElement("button");
    addButton.textContent = "Add task";
    addButton.id = "add-task-button";
    addButton.classList.add("simple-button");
    container.appendChild(addButton);
    addButton.addEventListener("click", () => {
        dialog.showModal();
    });
};

function renderTodayPage() {
    const container = document.getElementById("content");
    container.innerText = "";
    const title = document.createElement("h2");
    title.textContent = "Today";
    container.appendChild(title);
};

function renderWeekPage() {
    const container = document.getElementById("content");
    container.innerText = "";
    const title = document.createElement("h2");
    title.textContent = "This Week";
    container.appendChild(title);
};