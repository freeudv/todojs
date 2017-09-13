class ViewModel {
  constructor(model) {
    this.model = model;
  }

  get todos() {
    return this.model.todos;
  }

  addTodo(title, done) {
    const todo = this.model.add({
      id: Date.now(),
      title,
      isCompleted: false
    });

    done(todo);
  }

  toggleTodo(id, isCompleted, done) {
    const todo = this.model.update(id, { isCompleted });

    done(todo);
  }

  editTodo(id, title, done) {
    const todo = this.model.update(id, { title });

    done(todo);
  }

  deleteTodo(id, done) {
    const todo = this.model.remove(id);

    done(todo);
  }
}
