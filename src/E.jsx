import { useEffect, useState } from "react";
import "./styles.css"

export default function  So(){

  const [newItem,setNewItem]=useState("")
  const [todos,setTodos]=useState(()=>{
    const l=localStorage.getItem('items')
    if (l===null) return  []
    return JSON.parse(l)
  })


  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(todos))
  },[todos])
  function handleSubmit(e){
      //what happend after submission 
      e.preventDefault()
      setTodos(currentTodos=>{
        return  [...currentTodos,
          {id:crypto.randomUUID(),title:newItem,completed:false}
        ]
      })

  }
  function check(id,completed){
//how to deal with each item with id checked
    setTodos(currentTodos=>{
return currentTodos.map(todo=>
  {if(todo.id===id){
    return {...todo,completed}
  }
    return todo
    })
    })
  }
  function del(id){
setTodos(currentTodos=>{return currentTodos.filter(todo=>todo.id!==id)})
  }
  
  return (
    <>

<form  className="new-item-form" onSubmit={handleSubmit}>
  <div className="form-row">
  <label htmlFor="">New Item</label>
  <input onChange={e=>setNewItem(e.target.value)} type="text" id="item" value={newItem} />
  </div>
  <button className="btn" type="Submit">Add</button>
  </form> 
<h1 className="header">to do list </h1>
<ul className="list">
  {todos.length === 0 && "no todos"}
  {todos.map(todo=>{
    return (<li key={todo.id}>
    <label> 
      <input
       type="checkbox"  
       onChange={e=>check(todo.id,e.target.checked)}
        checked={todo.completed} />
      {todo.title}
    </label>
 <button onClick={()=>del(todo.id)}  className="btn btn-danger"> Delete </button>
</li>)

})}
</ul>
    </>
  );
}