import React from 'react';
import './style.less'

const Button = ({onClick, content, classButton}) => {
    return (
        <button className={`button ${classButton}`} onClick={onClick}>
            {content}
        </button>
    );
}

export {Button};
