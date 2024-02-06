import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

export const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        // Retrieve todo list from local storage on component mount
        const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
        setTodoList(storedTodoList);
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            const newTodo = {
                text: inputValue,
                status: 'pending'
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
  return (
<div className="container">
    <div className='text-center d-flex mt-4'>
        <input type='text' value={inputValue} onChange={handleInputChange} className='w-100 '/>
        <button type="button" class="btn btn-success" onClick={handleAddTodo}>+</button>
    </div>
    <div className='d-flex justify-content-center gap-2 mt-3'>
        <div>
            <button className="btn btn-secondary px-4">All</button>
        </div>
        <div>   <button className="btn btn-danger px-4">Low</button></div>
        <div>   <button className="btn btn-info px-4 ">Medium </button></div>
        <div>   <button className="btn btn-warning px-4">High </button></div>
    </div>

{/* todo list area Start */}
<div className='mt-3'>
{todoList.map((todo, index) => (
                    <div key={index} style={{position:'relative'}} className='border px-2 d-flex justify-content-between items-center py-2 mb-2'>
                        <span>{todo.text}</span>
        


                      <div className='d-flex justify-content-end items-center gap-2 '> 














                        <span className='px-3 pt-1  rounded ' style={{  background:todo?.status=='low'&&"#F8D7DA"||todo?.status=='complete'&&"#F8D7DA" , color: todo?.status==="medium"&&'#0DCAF0'||todo?.status==="low"&&"red"||todo?.status==="complete"&&"#D1E7DD"||todo?.status==="pending"&&"#8F8F8F"||"",fontWeight:"500",fontSize:'12px'}}>{todo?.status}</span>
                      <span className='d-flex justify-content-between gap-2 '>
                    
                    <button className='btn btn-primary d-flex justify-content-center items-center'><FaRegEdit /></button>
                    <button onClick={() => handleDeleteTodo(index)} className='btn btn-danger d-flex justify-content-center items-center'><MdDelete/></button>
                    
                    
                    <div class="dropdown">
  <button class="btn btn-light dropdown-toggle d-flex justify-content-center items-center'"  data-bs-toggle="dropdown" aria-expanded="false">
  <SlOptionsVertical />
  </button>
  <ul class="dropdown-menu">
  <li><button className="dropdown-item" onClick={() => handleUpdateStatus(index, 'complete')}>Complete</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleUpdateStatus(index, 'low')}>Low</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleUpdateStatus(index, 'medium')}>Medium</button></li>
  </ul>
</div>
                    
                    {/* <button className='btn btn-light d-flex justify-content-center items-center'><SlOptionsVertical /></button> */}
                </span>
                      </div>
                    </div>
                ))}
</div>

{/* todo list area End */}












</div>
  )
}
