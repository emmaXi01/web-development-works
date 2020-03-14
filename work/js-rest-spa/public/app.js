(function IIFE(){
    const pageStatus = document.querySelector('.page-status');
    const loginPanel = document.querySelector('.login-panel');
    const addUser = document.querySelector('.user-name');
    const login = document.querySelector('.login-button');
    const loginStatus = document.querySelector('.login-status');

    const storeInventory = document.querySelector('.store-inventory');
    const list = document.querySelector('.items');
    const addItem = document.querySelector('.add-button');
    const newItem = document.querySelector('.to-add-item');
    const itemQuantity = document.querySelector('.to-add-quantity');
    const itemStatus = document.querySelector('.item-status');

    const logout = document.querySelector('.logout-button');

    //error messages
    const errMessages = {
        'invalid-user': "User not found, please login!",
        'invalid-username': "Bad login, Please enter a valid user name without containing whitespace and 'dog'!",
        'network-error': "There is a problem connecting to the network, try again!",
        'missing-item-name': "The 'item name' properity is required!",
        'duplicate': "The item is already defined!",
        'invalid-quantity': "Quantity should be positive number!",
        'no-item': "The item doesn't exist!",
        'missing-quantity': "When update the quantity of item, the 'quantity' properity is required!"
    }
    
    function updateLoginStatus(message) {
        loginStatus.innerText = message;

    }
    function updateItemStatus(message) {
        itemStatus.innerText = message;
    }

    function renderInventory() {
        pageStatus.style.display = "none";
        loginPanel.style.display = "none";
        storeInventory.style.display = "block";  
        addItem.disabled = true; 
    }

    function renderLogin() {  
       pageStatus.style.display = "none";
       storeInventory.style.display = "none"; 
       loginPanel.style.display = "block"; 
       login.disabled = true;     
    }

    function renderItems( items ) {
        const itemList = items.map(
            (item) => `
            <li class="item-info">
                <span
                    data-item-id="${item.itemId}"
                    class="item-name"> ${item.itemName}</span>
                <button
                    data-item-id="${item.itemId}"
                    class="delete-item"> X </button>
                <span
                    data-item-id="${item.itemId}"
                    class="item-quantity"> ${item.quantity}</span>
                <button
                    data-item-id="${item.itemId}"
                    class="update-item"> Update </span>
            </li>
            `
        ).join('');
        list.innerHTML = itemList;
    }

    function convertError(response) {
        if(response.ok) { 
            return response.json(); 
        }

        return response.json()
        .then( err => Promise.reject(err) );
    }
    

    //call login service
    login.addEventListener('click', (event) => {
        const username = addUser.value;
        addUser.value = '';

        fetch('/session', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({ username }),
            credentials: 'include',
        })
        .catch( () => Promise.reject({ errorCode: 'network-error' }) )
        .then( (response) => {
            if(response.ok) {
                getItems();
            }
            return response.json().then(err => Promise.reject(err) );
        })
        .catch( err => {
            updateLoginStatus(errMessages[err.errorCode] || err.errorCode);
            login.disabled = true;     
        });
    });

    //get user
    addUser.addEventListener('keyup', (event) => {
        const text = event.target.value;
        login.disabled = !text;
    });


    //get the list of items
    function getItems() {
        //display loading
        pageStatus.style.display = "block";
        storeInventory.style.display = "none"; 
        loginPanel.style.display = "none"; 

        //you can use setTimeout() to mimic the process of loading when item data is very huge.
        fetch('/items', {
            method: 'GET'
        })
        .catch( () => Promise.reject({ errorCode: 'network-error' }))
        .then( convertError )
        .then( (items) => {
            renderInventory();
            renderItems(items);
            updateItemStatus('');
        })
        .catch( err => {
            renderLogin();
            updateLoginStatus(errMessages[err.errorCode] || err.errorCode);
        });   
    }


    //call add item service
    addItem.addEventListener('click', (event) =>{
        const itemName = newItem.value;
        let quantity = itemQuantity.value;
        //quantity default 0
        if(!quantity) {
            quantity = 0;
        }

        resetAddForm();
        fetch('/items', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ itemName, quantity }),
            credentials: 'include',
        })
        .catch( () => Promise.reject({ errorCode: 'nextwork-error' }) )
        .then( convertError )
        .then( (items) => {
            renderItems(items);
            updateItemStatus('');
        })
        .catch( err => {
            if(err.errorCode === 'invalid-user') {
                renderLogin();
                updateLoginStatus(errMessages[err.errorCode]);
            } else {
                updateItemStatus(errMessages[err.errorCode] || err.errCode);
            }
        });
    });

    function resetAddForm() {
        newItem.value = '';
        itemQuantity.value ='';
        addItem.disabled = true;
    }

    //get new item
    newItem.addEventListener('keyup', (event) => {
        const text = event.target.value;
        addItem.disabled = !text;
    });


    //update or remove an item
    list.addEventListener('click', (evernt) => {
        const itemId = event.target.dataset.itemId;

        if(event.target.classList.contains('update-item')) {
            const quantity = itemQuantity.value;

            fetch(`/items/${itemId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                if(err.errorCode === 'invalid-user') {
                    renderLogin();
                    updateLoginStatus(errMessages[err.errorCode]);
                } else if (err.errorCode === 'no-item') {
                    updateItemStatus(errMessages[err.errorCode] || err.errCode);
                    setTimeout( () => {
                        getItems();
                    }, (1000));   
                } else {
                    updateItemStatus(errMessages[err.errorCode] || err.errCode);
                }
            });   
        }

        if(event.target.classList.contains('delete-item')) {
            fetch(`/items/${itemId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                if(err.errorCode === 'invalid-user') {
                    renderLogin();
                    updateLoginStatus(errMessages[err.errorCode]);
                } else {
                    updateItemStatus(errMessages[err.errorCode] || err.errCode);
                    setTimeout( () => {
                        getItems();
                    }, (1000));   
                }
            });
        }
    });


    //logout
    logout.addEventListener('click', (event) => {
        fetch('/session', {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json'
            }),
        })
        .catch( () => Promise.reject({ errorCode: 'network-error' }) ) 
        .then( (response) => {
            if(response.ok) {
                renderLogin();
                updateLoginStatus('');
            }
            return response.json().then(err => Promise.reject(err) );  
        })
        .catch( err => {
            updateLoginStatus('');
        });
    });

    //on load  
    getItems();

})();