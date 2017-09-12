class Model {
  constructor(todos = [{ id: 1, title: 'Test', isCompleted: true }]) {
    this.todos = todos;
  }

  get(id) {
    return this.todos.find(todo => todo.id == id);
  }

  add(todo) {
    this.todos.push(todo);

    return todo;
  }

  update(id, data) {
    const todo = this.get(id);
    Object.keys(data).forEach(prop => (todo[prop] = data[prop]));

    return todo;
  }

  remove(id) {
    const todo = this.get(id);
    this.todos = this.todos.filter(todo => todo.id !== id);

    return todo;
  }
}
