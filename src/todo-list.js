import { TodoItem } from "./todo-item";

const todos = [];

export function addTodo(name, description, priority, dueDate) {
    description = description?.trim() || "";
    const newTodo = new TodoItem(name, description, priority, dueDate, false);
    todos.push(newTodo);
};

export const getTodos = () => todos;