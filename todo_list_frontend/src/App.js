import React, { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';
import './index.css';

// PUBLIC_INTERFACE
function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  // PUBLIC_INTERFACE
  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // PUBLIC_INTERFACE
  const startEditing = (id, text) => {
    setEditingId(id);
    setInputValue(text);
  };

  // PUBLIC_INTERFACE
  const updateTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: inputValue } : todo
    ));
    setEditingId(null);
    setInputValue('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Ocean Todo</h1>
      </header>

      <form className="task-form" onSubmit={editingId ? updateTodo : addTodo}>
        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingId(null);
                setInputValue('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <button
              className="icon-button"
              onClick={() => toggleComplete(todo.id)}
            >
              <CheckIcon 
                className={`h-6 w-6 ${todo.completed ? 'text-success' : 'text-gray-400'}`}
              />
            </button>
            
            <div className="todo-content">
              <p className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </p>
            </div>

            <div className="todo-actions">
              <button
                className="icon-button"
                onClick={() => startEditing(todo.id, todo.text)}
                disabled={todo.completed}
              >
                <PencilIcon className="h-5 w-5 text-primary" />
              </button>
              <button
                className="icon-button"
                onClick={() => deleteTodo(todo.id)}
              >
                <TrashIcon className="h-5 w-5 text-error" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
