import React, { useEffect, useState } from "react";

function getTasks(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
    },
  }).then((data) => data.json());
}

const Tasks = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(1);

  const [changeInput, setChangeInput] = useState("");

  async function userAction(url, met, Body = null) {
    const response = await fetch(url, {
      method: met,
      body: JSON.stringify(Body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    console.log(myJson);
    // window.localStorage.setItem("key", myJson);
    return myJson;
  }
  useEffect(() => {
    if (tasks.length >= 0) {
      getTasks("/tasks/").then((items) => {
        setTasks(items);
      });
    }
  }, [reload]);

  async function removeAction(url, met, Body = null) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    // window.localStorage.setItem("key", myJson);
    return myJson;
  }

  const taskHandle = (e, task) => {
    e.preventDefault();
    userAction("/tasks", "POST", {
      description: task,
    });
    setReload((prev) => !prev);
  };

  const removeTask = (e, id) => {
    e.preventDefault();
    removeAction(`/tasks/${id}`, "POST");
    setReload((prev) => !prev);
  };

  async function updateTask(id, body) {
    const response = await fetch(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenKey")}`,
      },
    });

    const myJson = await response.json();
    console.log(myJson);
  }

  const editTask = (e, id) => {
    e.preventDefault();
    console.log(changeInput);
    updateTask(id, {
      description: changeInput,
    });
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <h2>Create new task</h2>
        <form onSubmit={(e) => taskHandle(e, task)}>
          <input
            type="text"
            name=""
            placeholder="task"
            onChange={(e) => setTask(e.target.value)}
          />
          <input type="submit" name="" value="create" className="create" />
        </form>
        <h3>All tasks:</h3>

        {tasks.map((el) => {
          return (
            <div>
              <input
                type="text"
                placeholder={el.description}
                onChange={(e) => setChangeInput(e.target.value)}
              />

              <input
                type="submit"
                onClick={(e) => removeTask(e, el._id)}
                value="remove"
                className="remove"
              />
              <input
                type="submit"
                onClick={(e) => editTask(e, el._id)}
                value="Edit"
                className="Add"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tasks;
