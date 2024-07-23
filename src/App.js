/*------from new branch------*/
import React, { useState, useEffect } from 'react';
import './App.css';
import { MdDelete } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

// Utility functions
const getTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todolist');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todolist', JSON.stringify(todos));
};

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedTodos = getTodosFromLocalStorage();
    console.log('Loaded todos from localStorage:', savedTodos); // Debug log
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (title && description) {
      const newTodoItem = { title, description, completed: false, completedOn: null };
      const updatedTodosArr = [...todos, newTodoItem];
      setTodos(updatedTodosArr);
      saveTodosToLocalStorage(updatedTodosArr);
      setTitle("");
      setDescription("");
      console.log('Added todo:', newTodoItem); // Debug log
    }
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = todos.filter((_, i) => i !== index);
    setTodos(reducedTodo);
    saveTodosToLocalStorage(reducedTodo);
    console.log('Deleted todo at index:', index); // Debug log
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: true, completedOn } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    console.log('Completed todo at index:', index, 'on:', completedOn); // Debug log
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title:</label>
            <input
              type="text"
              placeholder="What's the task title?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <label>Description:</label>
            <input
              type="text"
              placeholder="What's the task description?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='todo-input-item'>
            <button type="button" className='primaryBtn' onClick={addTodo}>
              Add
            </button>
          </div>
        </div>
        <div className='btn-area'>
          <button
            className={`isCompleteScreen ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`isCompleteScreen ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className='todo-list'>
          {todos
            .filter(todo => isCompleteScreen === todo.completed)
            .map((todo, index) => (
              <div key={index} className='todo-list-item'>
                <div>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  {todo.completed && <p>Completed on: {todo.completedOn}</p>}
                </div>
                <div className='icons'>
                  {!todo.completed && (
                    <BsCheckCircle className='icon' onClick={() => handleComplete(index)} title='Complete?' />
                  )}
                  <MdDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete?' />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
