import { useEffect, useState } from "react";
import "./styles.css"
export default function App(){
  const [newItem,setNewItem]=useState("")
  const [todos,setTodos]=useState(()=>{
    const l=localStorage.getItem('ITEMS')
  if (l===null) return []
  return JSON.parse(l)
  })
  
  useEffect(()=>{
    localStorage.setItem('ITEMS',JSON.stringify(todos))
  },[todos])
  function handleSubmit(e){
    e.preventDefault()
    setTodos(currentTodos=>{
      return [
        ...currentTodos,
        {id:crypto.randomUUID(),title:newItem,completed:false}
      ]
    })
    setNewItem("");
  }

  function toggleTodo(id,completed){
    setTodos(currentTodos=>{
      return currentTodos.map(todo=>{
        if(todo.id === id){
          return {...todo,completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
      setTodos(currentTodos=>{
        return currentTodos.filter(todo=>todo.id!==id)
      })
  }
  console.log(todos)
   return (
    <>   
  <form className="new-item-form" onSubmit={handleSubmit}>
<div className="form-row">
  <label htmlFor="item">New Item</label>
  <input onChange={e=>setNewItem(e.target.value)} value={newItem} type="text" id="item" />
</div>
<button type="Submit" className="btn">Add</button>


  </form>
  <h1 className="header">Todo list</h1>
  <ul className="list">
    {todos.length === 0 && "NO TODOS"}
    {todos.map(todo=>{
      return (<li key={todo.id}>
      <label >
        <input
        onChange={e =>toggleTodo(todo.id,e.target.checked)}
         checked={todo.completed} type="checkbox" />
        {todo.title}
      </label> 
      <button onClick={()=>deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
    </li>)

    })}
  </ul>
 </>
  );
}