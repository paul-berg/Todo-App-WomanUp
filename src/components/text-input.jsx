import React from 'react';
import './style.less'

const TextInput = ({name, changeHandler, value, text}) => {
    return (
        <input type='text' name={name} className='text-input'
            onChange={changeHandler} value={value}
            placeholder={`Enter the ${text} of a new task`} />
    );
}

export {TextInput};
