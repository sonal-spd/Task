import React, { useState, useEffect } from "react";
import todoImage from "./../image/todo.png"
import './../App.css'

const storedTasks = JSON.parse(localStorage.getItem("tasks"))|| [];

function Todo() {
    const [tasks, setTasks] = useState(storedTasks);
    const [taskText, setTaskText] = useState("");
    const [filter, setFilter] = useState("all");
    const [editTaskId, setEditTaskId] = useState(null);
  
    // Load tasks from local storage on initial render
    useEffect(() => {
      try {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        
        if (storedTasks) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error("Error parsing stored tasks:", error);
      }
    }, []);
    
    
    useEffect(() => {
      
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
  
    // Add a new task
    const addTask = () => {
      if (taskText.trim() !== "") {
        const newTask = {
          id: Math.random().toString(36).substr(2, 9), 
          text: taskText,
          completed: false
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setTaskText("");
      }
    };
  
    // Toggle task completion status
    const toggleTaskCompletion = (index) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTasks(updatedTasks);
    };
  
    // Delete a task
    const deleteTask = (index) => {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    };
      // Function to clear all completed todos
  const clearCompletedTodos = () => {
    setTasks(tasks.filter(task => !task.completed));
  };
  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskText(taskToEdit.text);
  };
  const handleUpdateTask = async () => {
    if (taskText.trim() === '') {
      return;
    }

    const updatedTask = {
      text: taskText,
      completed: false
    };

      
      setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTaskId ? { ...task, ...updatedTask } : task
      )
    );
      setTaskText('');
      setEditTaskId(null);
    
  };
  
    // Filter tasks based on completion status
    const filteredTasks = tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  
    return (
      <div className="container mx-auto my-20 p-8 justify-center items-center bg-slate-200 w-1/2">
        
          <h1 className="flex justify-center text-3xl text-center font-bold mb-4 ">
          <img className="w-8" src={todoImage} alt="todo-image" /> 
          Todo List</h1>
        <div className="flex justify-center mb-4">
        
          <input
            type="text"
            className="form-input w-2/4 mr-2"
            placeholder="Enter task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="btn" onClick={editTaskId ? handleUpdateTask : addTask}>
            {editTaskId ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="flex justify-center">
    <div className=" mb-4 w-3/12">
      <label className="block text-center">Filter Tasks:</label>
      <select
        className="form-select mx-auto w-full text-center"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <button onClick={clearCompletedTodos} className="mt-5 px-4 py-2 justify-center bg-red-500 text-white rounded-lg focus:outline-none focus:bg-red-600">Clear Completed</button>
    </div>
  </div>
  
  
        <ul className="divide-y divide-gray-500 justify-center">
          {filteredTasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 mr-2"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              </div>
              <div className="flex flex-row gap-x-4">
              <button className="text-clue-500" onClick={() => handleEditTask(task.id)}>
              <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button className="text-red-500" onClick={() => deleteTask(index)}>
              <i className="fa-solid fa-trash-can"></i>
              </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="completed-task">
            <p>
              Completed: <span id="c-count">{tasks.filter((task) => task.completed).length}</span>
            </p>
          </div>
        <div className="remaining-task">
            <p>
              <span id="total-tasks">
                Total Tasks: <span id="tasks-counter">{tasks.length}</span>
              </span>
            </p>
          </div>
      </div>
    );
          }

export default Todo