import React from "react";

import Class from "../styles/showtask.module.css";



// component for showing  all the task
const ShowTask = (props) => {
  return (
    <div className={Class.taskBox}>
      
      {props.todo.map((post) => {
        return (
          <div key={post.id} className={Class.task}>
            <h2>{post.title}</h2>
            <div className={Class.icons}>
              <p
                onClick={() => {
                  props.updateHandler(post, true);
                }}
                
              >U</p>
              <p
                onClick={() => {
                  props.delete(post.id);
                }}
                
              >X</p>
              <p type="checkbox"
                onClick={() => {
                  props.completed(post);
                }}
               
                
              ><input type="checkbox"></input></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowTask;