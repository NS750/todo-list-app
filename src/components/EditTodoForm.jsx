import React, { useState } from 'react';

const EditTodoForm = ({ editTodo, task }) => {
    const [taskValue, setTaskValue] = useState(task.task);
    const [descriptionValue, setDescriptionValue] = useState(task.description);
    const [priorityValue, setPriorityValue] = useState(task.priority);
    const [categoryValue, setCategoryValue] = useState(task.category);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(taskValue, descriptionValue, priorityValue, categoryValue, task.id);
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
            <select 
                value={priorityValue} 
                onChange={(e) => setPriorityValue(e.target.value)} 
                className="todo-input priority"
            >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select 
                value={categoryValue} 
                onChange={(e) => setCategoryValue(e.target.value)} 
                className="todo-input priority"
            >
                <option value="">Select Category</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="fitness">Fitness</option>
                <option value="others">Others</option>
            </select>
            <button type="submit" className='todo-btn'>Update Task</button>
        </form>
    );
};

export default EditTodoForm;
