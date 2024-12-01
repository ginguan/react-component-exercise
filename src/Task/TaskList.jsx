import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Normal' });

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    addTask({ ...newTask, id: newId });
    setNewTask({ title: '', description: '', priority: 'Normal' });
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskPriority = (id, newPriority) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, priority: newPriority } : task);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div className="task-list">
        <h2>Backlog Tasks</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
          <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>
                Priority: 
                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </p>
              <button className="btn btn-remove" onClick={() => deleteTask(task.id)}>Remove Task</button>
            </li>
          ))}
        </ul>
      </div>
      <Stopwatch />
    </div>
  );
};

export default TaskList;
