import React, { useEffect } from 'react'
import "./App.css"
import { useState } from 'react'
import TaskForm from './components/TaskForm/TaskForm'
import TaskColumn from './components/TaskColumn/TaskColumn'
import closedIcon from "./assets/5610944.png"

const existingTasks = localStorage.getItem("tasks")

const App = () => {

 const [tasks, setTasks]= useState(JSON.parse(existingTasks) || []);
console.log("existingTasks",existingTasks)

useEffect(()=>{
  localStorage.setItem("tasks",JSON.stringify(tasks))

},[tasks]);

const [activeCard,setActiveCard]=useState(null);

const onDrop = (status, position)=>{
  console.log(`${activeCard} is going to place into ${status} and at the position ${position}`)

  if (activeCard === null || activeCard === undefined) return;
   const tasktoMove= tasks[activeCard]
   const updatedTasks= tasks.filter((task,index)=> index !== activeCard)
   updatedTasks.splice(position, 0, {
    ...tasktoMove,
    status:status,
   });

setTasks(updatedTasks)
}

 const handleDelete=(taskIndex)=>{
   const newTask= tasks.filter((task,index)=>index !== taskIndex)
   setTasks(newTask)
 }
//console.log(tasks)
  return (
    <div className='app'>
      <h1 style={{textAlign:'center', margin:"50px"}}>Jira Board</h1>
      <TaskForm setTasks={setTasks}/>
      <main className='app_main'>
        <TaskColumn title="Ready for Development" tasks={tasks} status="Ready for Development" handleDelete={handleDelete} setActiveCard={setActiveCard}  onDrop={onDrop}/>
        <TaskColumn title="In Progress" tasks={tasks} status="In Progress" handleDelete={handleDelete} setActiveCard={setActiveCard} onDrop={onDrop}/>
        <TaskColumn title="Ready for Test" tasks={tasks} status="Ready for Test" handleDelete={handleDelete} setActiveCard={setActiveCard} onDrop={onDrop}/>
        <TaskColumn icon={closedIcon} title="Closed" tasks={tasks} status="Closed" handleDelete={handleDelete} setActiveCard={setActiveCard}  onDrop={onDrop}/>
       
      </main>
      <h2>Active card:{activeCard}</h2>
    </div>
  )
}

export default App
