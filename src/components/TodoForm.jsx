import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(''); 
    const [priority, setPriority] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(task, description, dueDate, priority); 
        setTask('');
        setDescription('');
        setDueDate('');
        setPriority('');
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="todo-input"
                placeholder='Add a task'
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="todo-input"
                placeholder='Add a description'
            />
           <div className="due-priority-container">
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="todo-input due-date-input"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="todo-input priority">
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit" className='todo-btn'>Add Todo</button>
        </form>
    );
};

export default TodoForm;
