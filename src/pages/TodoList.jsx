import React from 'react'

const TodoList = ({todo,handelChecked,handelDelete,handelEdit}) => {
  return (
    <div>
                    {todo.map((todo) => {
                        return (<div key={todo.id} className=' todolist flex justify-between   text-xl font-medium gap-1.5 w-2/3  items-center border-amber-50 border p-2 mx-auto my-4'>
                            <div className='flex w-full   gap-2'>
                                <input type="checkbox"
                                checked={todo.completed}
                                onChange={()=>handelChecked(todo.id)}
                                className='p-2 checkbox' 
                                 />
                                <p className={todo.completed ? "line-through opacity-60" : ""}
                                >{todo.text}</p>
                            </div>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => handelDelete(todo.id)}
                                    className='bg-[#6633eebf] py-1 px-2  font-medium'>Delete</button>
                                { !todo.completed && <button
                                    onClick={() => handelEdit(todo.id)}
                                    className='bg-[#6633eebf] py-1 px-2 font-medium'>Edit</button>}
                            </div>
                        </div>)
                    })}


                </div>
  )
}

export default TodoList
