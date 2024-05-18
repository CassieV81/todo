
export class Todo {
    id: number | undefined;
    title: string;
    completed: boolean;

    constructor(title: string, completed: boolean = false) {
        this.title = title;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
