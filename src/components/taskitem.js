const TaskItem = ({task, id,status, taskHandlerL, title})=>{
    const dragStart =(e) =>{
        e.dataTransfer.setData('item_id', e.target.id)
        e.dataTransfer.setData('ctnr_id', title)

    }
  

     
    return (
     <div style={{margin:"4px", display: "flex"}} className ="taskbox"
     draggable 
     id= {id}
     onDragStart= { (e) =>dragStart(e, id)}
     onDragOver={(e) => e.preventDefault()}>
        <p className="task" >
            {task}
        </p>
        <div className="taskitembutton">
       {status !== "DONE" && <button onClick={()=> taskHandlerL(id)} id = "btn">
        ...</button>}
       </div>
    </div>
    )
}
export default TaskItem