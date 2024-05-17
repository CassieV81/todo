
export class Todo {
    id: number;
    title: string;
    completed: boolean;

    constructor(id: number, title: string, completed: boolean = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
