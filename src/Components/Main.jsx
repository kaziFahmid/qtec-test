import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';

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
          <div
            key={index}
            style={{ position: 'relative' }}
            className="border px-2 d-flex justify-content-between items-center py-2 mb-2"
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="form-control w-25"
                />
                <div className="d-flex justify-content-end items-center gap-2">
                  <button
                    className="btn btn-success d-flex justify-content-center items-center"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary d-flex justify-content-center items-center"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="d-flex justify-content-end items-center gap-2">
                  <span
                    className={`px-3 pt-1  rounded ${
                      todo?.status === 'pending' && 'bg-light'
                    }`}
                    style={{
                      background:
                        (todo?.status === 'high' && '#FFC107') ||
                        (todo?.status === 'low' && '#F8D7DA ') ||
                        (todo?.status === 'complete' && '#D1E7DD') ||
                        (todo?.status === 'medium' && '#0DCAF0'),
                      color:
                        (todo?.status === 'medium' && 'black') ||
                        (todo?.status === 'low' && 'red') ||
                        (todo?.status === 'complete' && 'green') ||
                        (todo?.status === 'pending' && '#8F8F8F') ||
                        (todo?.status === 'high' && 'black'),
                      fontWeight: '500',
                      fontSize: '12px',
                    }}
                  >
                    {todo?.status}
                  </span>
                  <span className="d-flex justify-content-between gap-2 ">
                    <button
                      className="btn btn-primary d-flex justify-content-center items-center"
                      onClick={() => handleStartEdit(index)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(index)}
                      className="btn btn-danger d-flex justify-content-center items-center"
                    >
                      <MdDelete />
                    </button>
                    <div class="dropdown">
                      <button
                        class="btn btn-light dropdown-toggle d-flex justify-content-center items-center"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <SlOptionsVertical />
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUpdateStatus(index, 'pending')}
                          >
                            Pending
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUpdateStatus(index, 'complete')}
                          >
                            Complete
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUpdateStatus(index, 'high')}
                          >
                            High
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUpdateStatus(index, 'low')}
                          >
                            Low
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleUpdateStatus(index, 'medium')}
                          >
                            Medium
                          </button>
                        </li>
                      </ul>
                    </div>
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* todo list area End */}
    </div>
  );
};

export default Main;
