import React, { useState } from 'react';

const EditTodoForm = ({ editTodo, task }) => {
    const [taskValue, setTaskValue] = useState(task.task);
    const [descriptionValue, setDescriptionValue] = useState(task.description); // State for description

    const handleSubmit = (e) => {
        // Prevent default action
        e.preventDefault();
        // Edit todo with both task and description
        editTodo(taskValue, descriptionValue, task.id);
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input 
                type="text" 
                value={taskValue} 
                onChange={(e) => setTaskValue(e.target.value)} 
                className="todo-input" 
                placeholder='Update task' 
            />
            <input 
                type="text" 
                value={descriptionValue} 
                onChange={(e) => setDescriptionValue(e.target.value)} 
                className="todo-input" 
                placeholder='Update description' 
            />
            <button type="submit" className='todo-btn'>Update Task</button>
        </form>
    );
};

export default EditTodoForm;
