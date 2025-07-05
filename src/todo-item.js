import { format } from "date-fns";

export class TodoItem {
    constructor(title, description, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    get dueDate() {
        return format(this._dueDate, "MM/dd/yyyy");
    }

    set dueDate(value) {
        this._dueDate = new Date(value + "T12:00:00");
    }

    get priority() {    
        return this._priority;
    }

    set priority(value) {
        const levels = ["low", "medium", "high"];
        if (!levels.includes(value.toLowerCase())) throw new Error("Invalid priority level");
        this._priority = value.toLowerCase();
    }
}