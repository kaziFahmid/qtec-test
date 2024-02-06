import React, { useEffect, useState } from 'react';

import { TodoItem } from './TodoItem/TodoItem';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState('all');

  const AllTodoListCount = todoList?.length;
  const AllTodoLowListsCount = todoList.filter((todo) => todo?.status === 'low').length;
  const AllTodoMediumListsCount = todoList.filter((todo) => todo?.status === 'medium').length;
  const AllTodoHighListsCount = todoList.filter((todo) => todo?.status === 'high').length;
  const AllTodoCompleteListsCount = todoList.filter((todo) => todo?.status === 'complete').length;

  const filteredTodoList = todoList.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
    setTodoList(storedTodoList);
  }, []);

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        text: inputValue,
        status: 'pending',
      };
      const newTodoList = [...todoList, newTodo];
      setTodoList(newTodoList);
      localStorage.setItem('todoList', JSON.stringify(newTodoList));
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].status = newStatus;
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };

  const handleStartEdit = (index) => {
    setEditingIndex(index);
    setInputValue(todoList[index].text);
  };

  const handleSaveEdit = () => {
    const updatedTodoList = [...todoList];
    updatedTodoList[editingIndex].text = inputValue;
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    setEditingIndex(null);
    setInputValue('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setInputValue('');
  };

  const handleFilter = (status) => {
    setFilter(status);
  };

  return (
    <div className="container">
      <div className="text-center d-flex mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-100 form-control"
        />
        <button type="button" className="btn btn-success" onClick={handleAddTodo}>
          +
        </button>
      </div>
      <div className="d-flex flex-column text-center flex-sm-row justify-content-center gap-2 mt-3">
        <div>
          <button
            className={`btn ${filter === 'all' ? 'btn-secondary' : 'border border-secondary'} px-4`}
            onClick={() => handleFilter('all')}
          >
            All {' '}
            ({AllTodoListCount})
          </button>
        </div>
        <div>
          {' '}
          <button
            className={`btn ${filter === 'complete' ? 'btn-success' : 'border border-success'} px-4`}
            onClick={() => handleFilter('complete')}
          >
            Complete {' '}
            ({AllTodoCompleteListsCount})
          </button>
        </div>
        <div>
          {' '}
          <button
            className={`btn ${filter === 'low' ? 'btn-danger' : 'border border-danger'} px-4`}
            onClick={() => handleFilter('low')}
          >
            Low {' '}
            ({AllTodoLowListsCount})
          </button>
        </div>
        <div>
          {' '}
          <button
            className={`btn ${filter === 'medium' ? 'btn-info' : 'border border-info'} px-4`}
            onClick={() => handleFilter('medium')}
          >
            Medium {' '}
            ({AllTodoMediumListsCount}){' '}
          </button>
        </div>
        <div>
          {' '}
          <button
            className={`btn ${filter === 'high' ? 'btn-warning' : 'border border-warning'} px-4`}
            onClick={() => handleFilter('high')}
          >
            High {' '}
            ({AllTodoHighListsCount}){' '}
          </button>
        </div>
      </div>

      {/* todo list area Start */}
      <div className="mt-3">
        {filteredTodoList.map((todo, index) => (
            <TodoItem
            index={index}
            todo={todo} 
            handleInputChange={handleInputChange} 
             editingIndex={editingIndex}
            inputValue={inputValue}
            handleStartEdit={handleStartEdit}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateStatus={handleUpdateStatus}/>
         
        ))}
      </div>
      {/* todo list area End */}
    </div>
  );
};

export default Main;
