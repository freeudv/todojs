class View {
  constructor(viewModel) {
    this.viewModel = viewModel;

    this.initialize();
  }

  initialize() {
    this.todoList = document.getElementById('todo-list');
    this.todoForm = document.getElementById('todo-form');
    this.addInput = document.getElementById('add-input');

    this.todoForm.addEventListener('submit', this.handleSubmit.bind(this));

    this.viewModel.todos.forEach(todo => this.addTodo(todo));
  }

  createTodo(todo) {
    const checkbox = createElement('input', {
      type: 'checkbox',
      className: 'checkbox',
      checked: todo.isCompleted ? 'checked' : '',
      onchange: this.handleToggle.bind(this)
    });

    const title = createElement('label', { className: 'title' }, todo.title);

    const editInput = createElement('input', {
      type: 'text',
      className: 'textfield'
    });

    const editButton = createElement(
      'button',
      { className: 'edit', onclick: this.handleEdit.bind(this) },
      'Изменить'
    );

    const deleteButton = createElement(
      'button',
      { className: 'delete', onclick: this.handleDelete.bind(this) },
      'Удалить'
    );

    const todoItem = createElement(
      'li',
      {
        className: `todo-item${todo.isCompleted ? ' completed' : ''}`
      },
      checkbox,
      title,
      editInput,
      editButton,
      deleteButton
    );

    todoItem.dataset.id = todo.id;

    return todoItem;
  }

  handleSubmit(event) {
    event.preventDefault();

    let title = this.addInput.value;

    if (title === '') {
      return alert('Необходимо ввести название задачи.');
    }

    this.viewModel.addTodo(title, this.addTodo.bind(this));
  }

  handleToggle({ target }) {
    const todoItem = target.parentNode;
    const id = todoItem.dataset.id;
    const isCompleted = target.checked;

    this.viewModel.toggleTodo(id, isCompleted, this.toggleTodo.bind(this));
  }

  handleEdit({ target }) {
    const todoItem = target.parentNode;
    const id = todoItem.dataset.id;
    const title = todoItem.querySelector('.title');
    const editInput = todoItem.querySelector('.textfield');
    const editButton = todoItem.querySelector('.edit');

    const isEditing = todoItem.classList.contains('editing');

    if (isEditing) {
      this.viewModel.editTodo(id, editInput.value, this.editTodo.bind(this));
    } else {
      editInput.value = title.innerText;
      editButton.innerText = 'Сохранить';
      todoItem.classList.add('editing');
    }
  }

  handleDelete({ target }) {
    const todoItem = target.parentNode;
    const id = todoItem.dataset.id;

    this.viewModel.deleteTodo(id, this.deleteTodo.bind(this));
  }

  addTodo(todo) {
    const todoItem = this.createTodo(todo);

    this.todoList.appendChild(todoItem);
    this.addInput.value = '';
  }

  toggleTodo(todo) {
    const todoItem = this.todoList.querySelector(`[data-id='${todo.id}']`);
    const checkbox = todoItem.querySelector('.checkbox');

    checkbox.checked = todo.isCompleted;

    if (todo.isCompleted) {
      todoItem.classList.add('completed');
    } else {
      todoItem.classList.remove('completed');
    }
  }

  editTodo(todo) {
    const todoItem = this.todoList.querySelector(`[data-id='${todo.id}']`);

    const title = todoItem.querySelector('.title');
    const editInput = todoItem.querySelector('.textfield');
    const editButton = todoItem.querySelector('.edit');

    title.innerText = todo.title;
    editButton.innerText = 'Изменить';

    todoItem.classList.remove('editing');
  }

  deleteTodo(todo) {
    const todoItem = this.todoList.querySelector(`[data-id='${todo.id}']`);

    this.todoList.removeChild(todoItem);
  }
}
