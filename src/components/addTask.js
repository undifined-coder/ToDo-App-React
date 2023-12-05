import React, { useEffect, useRef } from "react";
// importing all the css files
import Classes from "../styles/addtask.module.css";

const AddTask = (props) => {
  // useRef hook for inputs
  const title = useRef();

  useEffect(() => {//useeffect to update value or add tasks
    title.current.value = props.isEdit.edit ? props.isEdit.task.title : "";
  }, [props.isEdit]);
  return (
    // creating a container for the form
    <div className={Classes.taskContainer}>
      {}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.addtask(title.current.value);
          title.current.value = "";
        }}
      >
        <div className="inside-box">
          <label>Enter the task </label>
          <br />
          <input ref={title} type="text" required />
        </div>
        <div>
          {}
          {props.isEdit.edit ? (
            <button
              type="button"
              onClick={() => {
                const task = props.isEdit.task;//setting vlue
                task.title = title.current.value;
                props.updateHandler(task, false);
              }}
            >
              Save
            </button>
          ) : (
            <button type="submit">ADD TASK</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTask;