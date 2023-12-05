import React, { useEffect, useState, useMemo } from "react";

import {
  addTaskHandler,
  deleteTask,
  fetchTodo,
  updateTask,
} from "../api/index.js";
import AddTask from "./addTask.js";
import Spinner from "./loader.js";
import ShowTask from "./showTask.js";
import Classes from "../styles/todocontainer.module.css";
import { ReactNotifications, Store } from 'react-notifications-component'

const TodoContainer = () => {
  //loading state
  const [isLoading, setisLoading] = useState(true);
  // todo state
  const [Todo, setTodo] = useState([]);
  // editing state
  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {},
  });
  // set userId
  const userId = 1;
  // variable for react notifications
  const notifications = useMemo(() => {
    return {
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true,
      },
    };
  }, []);
  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
    Store.addNotification({
      title: "Congratulations",
      message: "Task Completed Succesfully",
      type: "success",
      ...notifications,
    });
  }
  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task,
      });
      return;
    }
    Store.addNotification({
      title: "Adding",
      message: "updating data",
      type: "info",
      ...notifications,
    });
    const data = await updateTask(task);
    if (data.success) {
      Store.addNotification({
        title: "fast",
        message: "Task updated succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "ok!",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
    setisEdit({
      edit: false,
      task: {},
    });
  }
  // setting up functions for deleting a particular task
  async function deleteHandler(id) {
    Store.addNotification({
      title: "Deleting...",
      message: "Deleting Data",
      type: "info",
      ...notifications,
    });
    const result = await deleteTask(id);
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      });
      setTodo(todo);
      Store.addNotification({
        title: "Hurry",
        message: "Task deleted succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "Sorry",
        message: result.message,
        type: "error",
        ...notifications,
      });
    }
  }
  async function addData(title) {
    Store.addNotification({
      title: "In Progress",
      message: "Adding Data",
      type: "info",
      ...notifications,
    });
    const data = await addTaskHandler(title, userId);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task added succesfully",
        type: "success",
        ...notifications,
      });
      setTodo([data.data, ...Todo]);
    } else {
      Store.addNotification({
        title: "Sorry",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
  }
  useEffect(() => {
    async function post() {
      Store.addNotification({
        title: "In Progress",
        message: "fetching Data",
        type: "info",
        ...notifications,
      });
      const data = await fetchTodo();
      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      } else {
        setisLoading(false);
        Store.addNotification({
          title: "Sorry",
          message: data.message,
          type: "error",
          ...notifications,
        });
      }
    }

    post();
  }, [notifications]);

  return (
    <div className={Classes.container}>
      <h1>TODO APP</h1>
      <AddTask
        addtask={addData}
        isEdit={isEdit}
        updateHandler={updateHandler}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <ShowTask
          todo={Todo}
          delete={deleteHandler}
          completed={completed}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
};

export default TodoContainer;