import React, { useContext } from 'react';
import { TodoItem } from '../todo-item/todo-item';
import { StateContext } from '../hoc/state-provider';
import './todo-list.less'


const TodoList = () => {
    const {todos} = useContext(StateContext)
    return (
        <ul>
        {
            todos.map(todo => (
                <TodoItem {...todo} key={todo.id}/>
            ))
        }
        </ul>
    );
}

export {TodoList};
