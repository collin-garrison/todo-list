import { TodoItem } from "./todo-item";

const todos = [];

export function addTodo(name, description, priority, dueDate) {
    description = description?.trim() || "";
    const newTodo = new TodoItem(name, description, priority, dueDate);
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

export const getTodos = () => todos;