import { addEventListeners, renderPage } from "./dom";
import { TodoItem } from "./todo-item";
import { setTodos } from "./todo-list";
import "./styles.css"

function loadSite() {
    const raw = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(raw.map(todo => new TodoItem(
        todo.name,
        todo.description,
        todo.priority,
        new Date(todo._dueDate)
    )));
    renderPage("inbox");
    addEventListeners();
}

loadSite();