class Controller {
  initialize(model, view) {
    this.model = model;
    this.view = view;
  }

  addTodo(title) {
    const todo = this.model.add({
      id: Date.now(),
      title,
      isCompleted: false
    });

    this.view.addTodo(todo);
  }

  toggleTodo(id, isCompleted) {
    const todo = this.model.update(id, { isCompleted });

    this.view.toggleTodo(todo);
  }

  editTodo(id, title) {
    const todo = this.model.update(id, { title });

    this.view.editTodo(todo);
  }

  deleteTodo(id) {
    const todo = this.model.remove(id);

    this.view.deleteTodo(todo);
  }
}
