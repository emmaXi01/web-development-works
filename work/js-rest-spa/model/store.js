const items = {
    "1": {
        itemId: "1",
        itemName: "milk",
        quantity: 10,  
    },

    "2": {
        itemId: "2",
        itemName: "egg",
        quantity: 5,
    }
};

function itemExisting(itemName) {
    const itemList = Object.values(items);
    for( let item of itemList ) {
        if(itemName === item.itemName) {
            return true;
        }
    }
    return false;
}

const store = {
    items,
    itemExisting,
}

module.exports = store;