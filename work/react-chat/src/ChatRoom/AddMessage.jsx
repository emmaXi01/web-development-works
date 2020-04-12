import React, {useState} from 'react';

function AddMessage({ onAdd }) {
    const [newText, setNewText] = useState('');

    const submitMessage = () => {
        if(newText) {
            onAdd(newText);
            setNewText('');
        }
    };

    const onTextChange = (e) => {
        setNewText(e.target.value);
    };


    return(
        <div>
            <label>Message: </label>
            <input className="to-add-message" onChange={onTextChange} value={newText}/>
            <button className="to-send" onClick={submitMessage}>Send</button>
        </div>
    )
    
};

export default AddMessage;