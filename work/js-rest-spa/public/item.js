(function IIFE() {

    const counter = () => {
        let count = 0;
        return () => {
            count += 1;
            return count;
        };
    };

    const nextId = counter();

    const items = {};

    const list = document.querySelector('.items');
    const addButton = document.querySelector('.add-button');
    const newItem = document.querySelector('.to-add-item');

    //render list of items
    const renderList = (items) => {
        list.innerHTML = Object.keys(items).map( (key) => {
            const item = items[key];
            const isButtonDisabled = item.quantity === 0;
            const buttonDiv = isButtonDisabled ?   
            `
             <button 
                data-id="${key}" 
                disabled="true"
                class="decrease-quantity"> - </button>
           `
            : 
           `
            <button 
                data-id="${key}" 
                class="decrease-quantity"> - </button>
           `;

            return `
                <li class="item-info">
                    <span 
                        data-id="${key}" 
                        class="item">${item.name}</span>
                    <button 
                        data-id="${key}" 
                        class="delete"> X </button>
                    ${buttonDiv}
                    <span 
                        data-id="${key}" 
                        class="item-quantity">${item.quantity}</span>
                    <button 
                        data-id="${key}" 
                        class="increase-quantity"> + </button>   
                </li>
            `;
        }).join('\n');

    };

    list.addEventListener('click', (event) => {
        const id = event.target.dataset.id;

        if(event.target.classList.contains('increase-quantity') && items[id]) {
            items[id].quantity += 1;
            renderList(items);
        }

        if(event.target.classList.contains('decrease-quantity')) {
            if(items[id] && items[id].quantity > 0) {
                items[id].quantity -= 1;     
                renderList(items);      
            } 
        }

        if(event.target.classList.contains('delete')) {
            delete items[id];
            renderList(items);
          }
    });

    //get item to add
    addButton.addEventListener('click', (event) => {
        const name = newItem.value;
    
        items[ nextId() ] = { name: name, quantity: 0 };
        renderList(items);
    
        newItem.value = '';
        addButton.disabled = true;
      });
    
    //get item
    newItem.addEventListener('keyup', (event) => {
        const text = event.target.value;
        addButton.disabled = !text;
    });
    
    // initial render
    addButton.disabled = true;
    renderList(items);

})();