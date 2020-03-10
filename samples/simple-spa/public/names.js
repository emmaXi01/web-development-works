(function iife() {
  const list = document.querySelector('.names');
  const status = document.querySelector('.status');
  const add = document.querySelector('.add');
  const toAdd = document.querySelector('.add-name');

  let names = [];
  const errMsgs = {
    'duplicate': 'That name already exists',
    'network-error': 'There was a problem connecting to the network, try again',
  };

  function updateStatus( message ) {
    status.innerText = message;
  }

  function renderNames( names ) {
    const html = names.map(
      (name) => `
        <li>
          <span class="name">${name}</span><span class="delete" data-name="${name}">X</span>
        </li>`
    ).join('');
    list.innerHTML = html;
  }

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  list.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete') ) {
      const name = e.target.dataset.name;
      fetch(`/people/${name}`, {
        method: 'DELETE',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( names => {
        renderNames(names);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });

  add.addEventListener('click', () => {
    const name = toAdd.value;
    if(name) {
      fetch(`/people/${name}`, {
        method: 'POST',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError)
      .then( names => {
        toAdd.value = '';
        renderNames(names);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });


  // on load
  fetch('/people/', {
    method: 'GET',
  })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then( convertError )
    .then( names => {
      renderNames(names);
      updateStatus('');
    })
    .catch( err => {
      updateStatus(errMsgs[err.error] || err.error);
    });
})();
