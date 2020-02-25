(function IIFE() {

  const addButton = document.querySelector('.outgoing button');
  const list = document.querySelector('.todos');
  const newTaskEl = document.querySelector('.to-add');

  newTaskEl.addEventListener('click', function (event) {
    if(event.target.classList.contains('todo')) {
      event.target.classList.toggle('complete');
    }
  });

  addButton.addEventListener('click', function (event) {
    // get item to add
    const text = newTaskEl.value;
    // add it
    // get ul
    // add new li
    const toAdd = document.createElement('li');
    toAdd.innerHTML = `<span class="todo">${text}</span>`;
    list.appendChild(toAdd);
    // clear text from input
    newTaskEl.value = '';
    addButton.disabled = true;
  });

  addButton.disabled = true;

  newTaskEl.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
  });
})();
