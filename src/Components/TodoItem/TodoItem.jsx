import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
export const TodoItem = ({handleInputChange, todo,index, editingIndex, inputValue, handleStartEdit, handleSaveEdit, handleCancelEdit, handleDeleteTodo, handleUpdateStatus }) => {
  return (
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
  )
}
