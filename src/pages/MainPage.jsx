import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Todolist from "./Todolist";
import addbtn from '../assets/Add.png'
import updatebtn from '../assets/Update.png'



const MainPage = () => {
    const [todo, setTodo] = useState(()=>{
        const saved = localStorage.getItem("todos")
        return saved ? JSON.parse(saved) : [];
    });
    const [value, setValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("all")

    const filteredTodos = todo.filter(item => {
        if(filter=== 'active') return !item.completed;
        if(filter === 'completed') return item.completed;
        return true;
    })

   

     
    const handelTyping = (e) => {
        setValue(e.target.value)
    }



    // To add or update list
    const handelAdd = () => {
        if (!value.trim()) return;
       
        if(editingId !== null){
            setTodo(prev => prev.map( item=>
                item.id == editingId ? {...item,text:value}
                :item
            ));
            setEditingId(null);
            setValue("");

            
        }
    else{
            setTodo(prev => [...prev, {
            id: nanoid(),
            text: value,
            completed: false,
        
        }])

        setValue('')
    }

    }
     // Enter Key Function
    const addDataKey = (e) => {
        if (e.key == "Enter") {
            handelAdd()
        }
    }
    // Storing in localStorage
    useEffect(() => {
        
        localStorage.setItem("todos" , JSON.stringify(todo))
       
    }, [todo])
 
   
   
    
   // To Delete
    const handelDelete = (id) => {
        setTodo(prev => prev.filter(item => item.id !== id))
    }

    // TO edit 
    const handelEdit = (id) => {

        const foundTodo = todo.find(item => item.id === id);
        if(!foundTodo) return;
          setValue(foundTodo.text)
          setEditingId(id)
          
    }

     // checkbox logic
    const handelChecked = (id) => { 
        setTodo(
            prev =>
                prev.map(item => item.id === id ? {...item, completed : !item.completed} : item ) 
        )
     } 

   




    return (
        <>

            <title>TODO - A Place To List Of Things</title>



            <h1 className='text-white text-center md:text-4xl text-3xl mt-5 font-bold  p-4'>TO DO LIST</h1>

            <div className='text-white sticky top-0 bg-black flex justify-center items-center pt-6 gap-3'>
                <input type="text"
                    onChange={handelTyping}
                    onKeyDown={addDataKey}
                    value={value}
                    placeholder="Enter Your Task"
                    className=' bg-gray-300 md:w-1/2 w-[65%] p-2 placeholder:text-gray-400! font-bold text-black! ' />
                <button
                    onClick={handelAdd}
                    className='bg-[#6633eebf] w-10 p-2   rounded font-medium'>{editingId ? <img src={updatebtn} alt="Update Button" /> :<img  src={addbtn} alt="Add button"/> }</button>
            </div>

            <div>
                <h2 className='text-2xl font-medium pt-8 text-center  mb-4'>TASK LIST</h2>
                
                <Todolist todo={filteredTodos} handelChecked={handelChecked} handelEdit={handelEdit} handelDelete={handelDelete}
                setFilter={setFilter}
                 />
            </div>



        </>
    )
}

export default MainPage