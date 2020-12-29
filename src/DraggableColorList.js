import React from 'react';
import DraggableColorBox from "./DraggableColorBox";
import {SortableContainer} from "react-sortable-hoc";
const DraggableColorList=SortableContainer(({colors,handleDelete,onSortEnd})=>{
    return (
        <div style={{height:"100%"}}>
            {colors.map((color,i)=>(
                <DraggableColorBox index={i} color={color.color} key={color.name} name={color.name} handleClick={handleDelete} onSortEnd={onSortEnd}/>
            ))}
        </div>
    )
})

export default DraggableColorList;