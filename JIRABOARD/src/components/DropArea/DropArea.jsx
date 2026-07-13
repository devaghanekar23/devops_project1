import React from 'react'
import { useState } from 'react';
import "./DropArea.css"

const DropArea = ({onDrop}) => {
    const [showDrop, setShowDrop]=useState(false);
  return (
    <div>
      <section className={showDrop ? "drop_area" : "hide_drop"}
      onDragEnter={()=>{setShowDrop(true)}}
       onDragLeave={()=>{setShowDrop(false)}}
       onDrop={()=>{
        onDrop();
        setShowDrop(false) }}

       onDragOver={(e) => e.preventDefault()}

      >Drop Area Here</section>
    </div>
  )
}

export default DropArea
