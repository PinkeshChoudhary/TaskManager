import ListContainer from "./components/ListContainer";
import { useState } from 'react';
import Modal from './components/Modal';

 
function Dashboard() {
  const [todoArr, setTodoArr] = useState([])
  const [inprogressArr, setInProgressArr] = useState([])
  const [doneArr, setDoneArr] = useState([])
  const [showModal , setShowModal] = useState(false)
const [taskText, setText]=useState('')

  const taskHandler = (id, title) => {
    if(title==="Todo"){
    const resttodoArr = todoArr.filter(td => td.id !== id)
    const inprogresstodo = todoArr.filter(td => td.id === id)[0]
    setTodoArr(resttodoArr)
    setInProgressArr([...inprogressArr ,inprogresstodo] )
  } else if(title==="In Progress"){
    const restIpArr = inprogressArr.filter(td => td.id !== id)
    const donetodo = inprogressArr.filter(td => td.id === id)[0]
    const finalData= [...doneArr ,donetodo].map(el=>{return {...el, status:"DONE"}})
    setInProgressArr(restIpArr)
    setDoneArr(finalData );
    }
  }
const handleAddTask= ()=> {
  if(taskText){
    const todoObj = {
      id: Date.now(),
      task:taskText,
      status:"PENDING"
    }
    const newArr = [...todoArr, todoObj];
    setTodoArr(newArr);
    setText("")
  } else alert("Task Cant be empty")
  
setShowModal(false)
}
const modalClosehandler = () =>{
  setShowModal(false);
  setText('')
}

const dragTaskHandler = (id, dragctnrId, dropctnrId) =>{
  console.log(dragctnrId, dropctnrId)

if(dragctnrId === "Todo" && dropctnrId === "In Progress"){
const resttodoArr = todoArr.filter(td => td.id !== id)
const inprogresstodo = todoArr.filter(td => td.id === id)[0]
setTodoArr(resttodoArr)
setInProgressArr([...inprogressArr ,inprogresstodo] )
return
} else {
  const restIpArr = inprogressArr.filter(td => td.id !== id)
  const donetodo = inprogressArr.filter(td => td.id === id)[0]
  const finalData= [...doneArr ,donetodo].map(el=>{return {...el, status:"DONE"}})
  setInProgressArr(restIpArr)
  setDoneArr(finalData );
}

}
  return (
    <>
    <div className="taskctnr">
      <ListContainer title="Todo" theme = {{color : '#ffc8c2'}}
       data={todoArr} taskHandler={taskHandler} 
       dragTaskHandler ={dragTaskHandler}/>

      <ListContainer title="In Progress" theme = {{color : '#fff6e6'}}
       data={inprogressArr} taskHandler={taskHandler} 
       dragTaskHandler ={dragTaskHandler}/>

      <ListContainer title=" Done" theme = {{color : '#effce1'}} 
      data={doneArr} 
      dragTaskHandler ={dragTaskHandler}/>
    
    </div>

    <div className="Addtask">
      {/* <input type= "textarea" id="text" value={taskText} onChange={(e)=>setText(e.target.value) }/> */}
      <span className="addbutton">
      <button type= "submit" id="button" onClick={() =>setShowModal(true) }> +AddTask</button>
      </span>
    </div>
    {
      showModal && <Modal onSubmit = {handleAddTask} onClose ={modalClosehandler}>
    <input type= "textarea"  value={taskText} onChange={(e)=>setText(e.target.value) } />

      </Modal>
    }
    </>
  );
}

export default Dashboard;
