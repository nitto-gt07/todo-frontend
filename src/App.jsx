import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;
    await axios.post(API_URL, { text });
    setText('');
    fetchTodos();
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  const editTodo = async (id, newText) => {
    await axios.put(`${API_URL}/${id}`, { text: newText });
    fetchTodos();
  };
  

  return (
    <div className="center-screen">
      <div className="todo-container">
        <h1>✅ React To-Do List</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>
  
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
  
};  
export default App;
