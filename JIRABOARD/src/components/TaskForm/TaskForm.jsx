import React from 'react'
import "./TaskForm.css";
import Tag from '../Tag/Tag';
import { useState } from "react";



const TaskForm = ({setTasks}) => {

  //  const [task, setTask] =useState();
  //  const [status, setStatus]=useState();
  //  console.log(task,status);

  // const handleChange=(e)=>{
  //   setTask(e.target.value)
  // }
  // const handleStatusChange=(e)=>{
  //  setStatus(e.target.value)
  // }

  //ShortCut for multiple fields using single usestate
  const [taskData, setTaskData] = useState({
    task: "",
    status: "Ready for development",
    tags: [],

  })


   const checkTag=(tag)=>{
    return taskData.tags.some((item)=>item ===tag)
  }


  const handleChange = (e) => {

    const { name, value  } = e.target;
    setTaskData((prev) => {
    
      return { ...prev,[name]:value};
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev)=>{
      return [...prev, taskData]
    })
  setTaskData({
     task: "",
    status: "Ready for development",
    tags: []
  })
    // console.log(taskData)
  }
 
 

  const selectedTag = (tag) => {

 setTaskData((prev)=>{
  const isSelected=prev.tags.includes(tag);
  const tags=isSelected ? prev.tags.filter((item)=> item !== tag) : 
  [...prev.tags, tag];

  return {...prev, tags}
 });


//     if(taskData.tags.some((item)=>item ===tag)){
//       const filterTags=taskData.tags.filter((item)=> item !== tag);
//       setTaskData((prev)=>{
//         return {...prev, tags:filterTags };
      
//       });
//     }else{
//       setTaskData((prev)=>{
//         return {...prev, tags:[...prev.tags, tag]};
//       })
//     }
};
 console.log(taskData);

  return (

    <header className='app_header'>
      <form onSubmit={handleSubmit}>
        <input type='text'
          name='task' 
          value={taskData.task}
          className='task_input'
          placeholder='Enter Task Detail'
          onChange={handleChange} />

        <div className='task_form_bottom'>
          <div>
            <Tag tagName="DEV" selectedTag={selectedTag} selected={checkTag("DEV")} />
            <Tag tagName="QA" selectedTag={selectedTag} selected={checkTag("QA")}/>
            <Tag tagName="Product Owner" selectedTag={selectedTag} selected={checkTag("Product Owner")}/>
          </div>
          <div>
            <select className="task_status" name="status"  value={taskData.status} onChange={handleChange}>
              <option value="Ready for Development">Ready for Development</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Test">Ready for Test</option>
              <option value="Closed">Closed</option>
            </select>
            <button type="submit" className='task_submit'>+ Add</button>
          </div>
        </div>
      </form>
    </header>

  )
}

export default TaskForm
