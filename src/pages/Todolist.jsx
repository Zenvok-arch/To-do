import deletebtn from '../assets/Delete.png'
import editbtn from '../assets/Edit.png'

const Todolist = ({ todo, handelChecked, handelDelete, handelEdit,setFilter }) => {
 
  
     

    return (
        <div>

            <div className='Todo-Tabs tbtn w-[70%] mx-auto flex justify-around font-medium  text-[16px]'>
                <button onClick={()=>setFilter('all')}><span>All</span></button>
                <button onClick={()=>setFilter('active')} ><span>Active</span></button>
                <button onClick={()=>setFilter('completed')}><span>Completed</span></button>

            </div>


            {todo.map((todo) => {
                return (<>





                    <div key={todo.id} className=' Todolist flex justify-between   text-xl font-medium gap-1.5 md:w-2/3 w-[85%] rounded  items-start border-amber-50 border px-2 py-2 mx-auto my-4'>




                        {/* list of Todos */}
                        <div className='flex w-full   gap-2'>
                            <input type="checkbox"
                                checked={todo.completed}
                                onChange={() => handelChecked(todo.id)}
                                className='p-2 checkbox mr-2'
                            />
                            <p className={todo.completed ? "line-through text-[16px] opacity-60" : " w-[70%] text-[16px]"}
                            >{todo.text}</p>
                        </div>
                        <div className='flex gap-2'>
                            {!todo.completed && <button
                                onClick={() => handelEdit(todo.id)}
                                className='bg-[#6633eebf] py-1 rounded px-2 font-medium'><img className='imgbnt'  src={editbtn} alt="edit button" /></button>}
                                <button
                                    onClick={() => handelDelete(todo.id)}
                                    className='bg-[#6633eebf] rounded py-1 px-2  font-medium'><img className='imgbnt '  src={deletebtn} alt="edit button" /></button>
                        </div>
                    </div>
                </>)
            })}


        </div>
    )
}

export default Todolist
