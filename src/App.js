import React from 'react';
import { AddTaskForm } from './hoc/add-edit-todo-form';
import { TodoList } from './todo-list/todo-list';


import './App.less';

const App = () => {
  return (
      <div className="App">
        <AddTaskForm />
        <TodoList />
    </div>
  );
}

export default App;
