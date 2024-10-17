const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


let todos = [];


app.get('/', (req, res) => {
    res.send('Todo API is running!');
});


app.get('/api/todos', (req, res) => {
    res.json(todos);
});


app.post('/api/todos', (req, res) => {
    const { task, description, priority, category, dueDate } = req.body;
    const newTodo = {
        id: todos.length + 1, 
        task,
        description,
        priority,
        category,
        dueDate,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});


app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id == id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const { task, description, priority, category, dueDate } = req.body;
    todo.task = task !== undefined ? task : todo.task;
    todo.description = description !== undefined ? description : todo.description;
    todo.priority = priority !== undefined ? priority : todo.priority;
    todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
    todo.category = category !== undefined ? category : todo.category;

    res.json(todo);
});


app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id != id);
    res.json({ message: 'Todo deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
