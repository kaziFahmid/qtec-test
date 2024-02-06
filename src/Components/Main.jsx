import React from 'react'

export const Main = () => {
  return (
<div className="w-25 mx-auto ">
    <div className='text-center d-flex mt-4'>
        <input type='text' className='w-100 '/>
        <button type="button" class="btn btn-success">+</button>
    </div>
    <div className='d-flex justify-content-center gap-2 mt-3'>
        <div>
            <button className="btn btn-secondary px-4">All</button>
        </div>
        <div>   <button className="btn btn-danger px-4">Low</button></div>
        <div>   <button className="btn btn-warning px-4">Medium </button></div>
        <div>   <button className="btn btn-warning px-4">High </button></div>
    </div>

<div>
    <div className='border d-flex justify-content-between '><span>asdf</span><span><button className='btn btn-primary'></button><button className='btn btn-danger'></button> <button className='btn btn-light'></button></span></div>
</div>














</div>
  )
}
