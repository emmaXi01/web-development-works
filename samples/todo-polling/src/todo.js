import {
  fetchLogIn,
  fetchLoginStatus,
  fetchTodos
} from './services';

const appState = {
  pollId: null,
  isLoggedIn: false,
  todos: [],
  error: '',
};

function renderLogin( show ) {
  const login = document.querySelector('.login');
  if(show) {
    login.innerHTML = `
      <label>Username: <input/></label>
      <button class="to-login" type="button">Login</button>
    `;
  } else {
    login.innerHTML = ``;
  }
}

function renderErrors( text ) {
  document.querySelector('.status').innerHTML = text;
}

function poll(shouldPoll) {
  if( shouldPoll && !appState.pollId ) {
    appState.pollId = setInterval( () => {
      fetchTodos()
      .catch( () => {
        appState.error = 'this should be a real error message';
        renderPage();
      })
      .then( list => {
        appState.error = '';
        appState.todos = list;
        renderPage();
      });
    }, 3000);
  }
  // For when a user logs out:
  if( !shouldPoll && appState.pollId ) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

function renderTasks( list ) {
  const tasks = document.querySelector('.todos');
  tasks.innerHTML = list.map( (item) => `<li>${item}</li>` ).join('');
}

function renderPage() {
  if(!appState.isLoggedIn)  {
    renderLogin(true);
    renderTasks([]);
  } else {
    renderLogin(false);
    renderTasks(appState.todos);
  }
  renderErrors(appState.error);
}

const login = document.querySelector('.login');
login.addEventListener('click', (e) => {
  if(!e.target.classList.contains('to-login')) {
    return;
  }

  const username = login.querySelector('input').value;
  fetchLogIn(username)
  .then( (list) => {
    appState.isLoggedIn = true;
    appState.todos = list;
    appState.error = '';
    poll(true);
    renderPage();
  })
  .catch( () => {
    appState.error = 'Login failed';
    renderPage();
  });
});


// Initial load
fetchLoginStatus()
.then( () => {
  appState.isLoggedIn = true;
  poll(true);
  renderPage();
})
.catch( () => {
  appState.isLoggedIn = false;
  renderPage();
});
