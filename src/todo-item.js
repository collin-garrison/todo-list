import { format } from "date-fns";

export class TodoItem {
    constructor(name, description, priority, dueDate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        if (value instanceof Date) {
            this._dueDate = value;
        }
        else {
            this._dueDate = new Date(value + "T12:00:00");
        }
    }

    get formattedDueDate() {
        return format(this._dueDate, "MM/dd/yyyy"); 
    }
}