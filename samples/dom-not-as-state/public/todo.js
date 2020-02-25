(function IIFE() {

  const counter = () =>  {
    let count = 0;
    return () => {
      count += 1;
      return count;
    };
  };
  const nextId = counter();

  const todos = {};

  const addButton = document.querySelector('.outgoing button');
  const list = document.querySelector('.todos');
  const newTaskEl = document.querySelector('.to-add');

  const renderList = (todos) => {
    list.innerHTML = Object.keys(todos).map( (key) => {
      const todo = todos[key];
      return `
        <li>
          <span
            data-id="${key}"
            class="todo ${todo.done ? 'complete' : ''}">${todo.task}</span>
          <span
            data-id="${key}"
          class="delete">X</span>
        </li>
      `;
    }).join('\n');
  };

  list.addEventListener('click', function (event) {

    const id = event.target.dataset.id;
    if(event.target.classList.contains('todo') && todos[id]) {
      todos[id].done = !todos[id].done;
      renderList(todos);
    }

    if(event.target.classList.contains('delete')) {
      delete todos[id];
      renderList(todos);
    }
  });

  addButton.addEventListener('click', function (event) {
    // get item to add
    const text = newTaskEl.value;

    todos[ nextId() ] = { task: text, done: false };
    renderList(todos);

    newTaskEl.value = '';
    addButton.disabled = true;
  });

  newTaskEl.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
  });

  // initial render
  addButton.disabled = true;
  renderList(todos);
})();
