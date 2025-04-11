import { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onEdit(todo._id, newText);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
        </>
      ) : (
        <span
            onClick={() => onToggle(todo._id, todo.completed)}
            className={todo.completed ? 'completed' : ''}
            >
            {todo.text}
        </span>

      )}

      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => onDelete(todo._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
