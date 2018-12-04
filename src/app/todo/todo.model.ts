export class ToDo {
  id: string;
  done: boolean;
  description: string;

  constructor(description: string) {
    this.id = Math.random().toString(36).substring(7);
    this.done = false;
    this.description = description;
  }
}
