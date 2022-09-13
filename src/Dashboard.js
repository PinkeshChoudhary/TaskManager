import ListContainer from "./components/ListContainer";
import React, { useState } from "react";
import Modal from "./components/Modal";
import classes from "./components/Css/Dashboard.module.css";

function Dashboard() {
  const [todoArr, setTodoArr] = useState([]);
  const [inProgressArr, setInProgressArr] = useState([]);
  const [doneArr, setDoneArr] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskText, setText] = useState("");
  const refInput = React.useRef();

  React.useEffect(() => {
    if (showModal) {
      refInput.current.focus();
    }
  }, [showModal]);

  const taskHandler = (id, title) => {
    if (title === "Todo") {
      const restTodoArr = todoArr.filter((td) => td.id !== id);
      const inProgressTodo = todoArr.filter((td) => td.id === id)[0];
      setTodoArr(restTodoArr);
      setInProgressArr([...inProgressArr, inProgressTodo]);
    } else if (title === "In Progress") {
      const restIpArr = inProgressArr.filter((td) => td.id !== id);
      const doneTodo = inProgressArr.filter((td) => td.id === id)[0];
      const finalData = [...doneArr, doneTodo].map((el) => {
        return { ...el, status: "DONE" };
      });
      setInProgressArr(restIpArr);
      setDoneArr(finalData);
    }
  };
  const handleAddTask = () => {
    if (taskText) {
      const todoObj = {
        id: Date.now(),
        task: taskText,
        status: "PENDING",
      };
      const newArr = [...todoArr, todoObj];
      setTodoArr(newArr);
      setText("");
    } else alert("Task Cant be empty");

    setShowModal(false);
  };
  const modalCloseHandler = () => {
    setShowModal(false);
    setText("");
  };

  const dragTaskHandler = (id, dragCenterId, dropCenterId) => {
    console.log(dragCenterId, dropCenterId);

    if (dragCenterId === "Todo" && dropCenterId === "In Progress") {
      const restTodoArr = todoArr.filter((td) => td.id !== id);
      const inProgressTodo = todoArr.filter((td) => td.id === id)[0];
      setTodoArr(restTodoArr);
      setInProgressArr([...inProgressArr, inProgressTodo]);
      return;
    } else {
      const restIpArr = inProgressArr.filter((td) => td.id !== id);
      const doneTodo = inProgressArr.filter((td) => td.id === id)[0];
      const finalData = [...doneArr, doneTodo].map((el) => {
        return { ...el, status: "DONE" };
      });
      setInProgressArr(restIpArr);
      setDoneArr(finalData);
    }
  };

  return (
    <>
      <div className={classes.taskCenter}>
        <ListContainer
          title="Todo"
          theme={{ color: "#ffc8c2" }}
          data={todoArr}
          taskHandler={taskHandler}
          dragTaskHandler={dragTaskHandler}
        />

        <ListContainer
          title="In Progress"
          theme={{ color: "#fff6e6" }}
          data={inProgressArr}
          taskHandler={taskHandler}
          dragTaskHandler={dragTaskHandler}
        />

        <ListContainer
          title=" Done"
          theme={{ color: "#effce1" }}
          data={doneArr}
          dragTaskHandler={dragTaskHandler}
        />
      </div>

      <div className={classes.AddTask}>
        {/* <input type= "textarea" id="text" value={taskText} onChange={(e)=>setText(e.target.value) }/> */}
        <span className={classes.addButton}>
          <button type="submit" id="button" onClick={() => setShowModal(true)}>
            {" "}
            +AddTask
          </button>
        </span>
      </div>

      {showModal && (
        <Modal onSubmit={handleAddTask} onClose={modalCloseHandler}>
          <input
            type="textarea"
            value={taskText}
            onChange={(e) => setText(e.target.value)}
            ref={refInput}
          />
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
