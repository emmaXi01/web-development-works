import React from 'react';

function Sort({ onSort }) {
    const sortTasks = (e) => {
        onSort(e.target.value);
    }

    return(
        <div className="sort-panel">
            <label>Order:</label>
            <input type="radio" value="ORDER_ASC" name="sort-option" onClick={sortTasks} />
            <label>A-Z</label>
            <input type="radio" value="ORDER_DESC" name="sort-option" onClick={sortTasks} />
            <label>Z-A</label>
        </div>
    )
}

export default Sort;