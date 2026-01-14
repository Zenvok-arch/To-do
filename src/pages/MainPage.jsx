import { useState, useEffect } from "react";
import TodoList from "./TodoList";

const MainPage = () => {
    const [todo, setTodo] = useState(()=>{
        const saved = localStorage.getItem("todos")
        return saved ? JSON.parse(saved) : [];
    });
    const [value, setValue] = useState("");
    const [editingId, setEditingId] = useState(null);
   

     
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
            id: crypto.randomUUID(),
            text: value,
            completed: false
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



            <h1 className='text-white text-center text-5xl font-bold  p-4'>TO DO LIST</h1>

            <div className='text-white sticky top-0 bg-black flex justify-center items-center pt-6 gap-3'>
                <input type="text"
                    onChange={handelTyping}
                    onKeyDown={addDataKey}
                    value={value}
                    placeholder="Enter Your Task"
                    className=' bg-gray-300 \ w-1/2 p-2 placeholder:text-gray-400! font-bold text-black! ' />
                <button
                    onClick={handelAdd}
                    className='bg-[#6633eebf] p-2  font-medium'>{editingId ? "UPDATE" : "ADD"}</button>
            </div>

            <div>
                <h2 className='text-2xl font-medium pt-8 text-center  mb-4'>TASK LIST</h2>
                 <TodoList todo={todo} handelChecked={handelChecked} handelDelete={handelDelete} handelEdit={handelEdit}/>
            </div>



        </>
    )
}

export default MainPage