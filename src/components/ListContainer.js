import TaskItem from "./taskitem";
import classes from "./Css/ListContainer.module.css";

function ListContainer({ title, data, taskHandler, theme, dragTaskHandler }) {
  const onDrop = (e) => {
    const dragId = JSON.parse(e.dataTransfer.getData("item_id"));
    const ctnrId = e.dataTransfer.getData("ctnr_id");

    e.preventDefault();
    if (ctnrId === title) {
      return;
    }
    //here dragId = item_id & ctnrId = draglistCtnrId/title & title = dropCtnrId/title(or currentListCtnrId)
    dragTaskHandler(dragId, ctnrId, title);
  };
  const getStyle = (color) => {
    const headerStyle = {
      backgroundColor: color,
    };
    const ctnrStyle = {
      border: `1px solid ${color}`,
    };
    console.log({ headerStyle, ctnrStyle });
    return { headerStyle, ctnrStyle };
  };
  return (
    <div className={classes.listCenter}>
      <div
        className={classes.titleBar}
        style={getStyle(theme.color).headerStyle}
      >
        {title}
        <span style={{ padding: "7px" }}>{data.length}</span>
      </div>
      <div
        className="ctnr"
        style={getStyle(theme.color).ctnrStyle}
        droppable="true"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {data.length > 0 ? (
          data.map((el) => (
            <TaskItem
              key={el.id}
              id={el.id}
              task={el.task}
              status={el.status}
              taskHandlerL={(id) => taskHandler(id, title)}
              title={title}
            />
          ))
        ) : (
          <p style={{ fontSize: "10px" }}>No task available</p>
        )}
      </div>
    </div>
  );
}

export default ListContainer;
