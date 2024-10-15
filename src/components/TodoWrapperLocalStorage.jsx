import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all'); 


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Update this function to accept task and description
  const addTodo = (task, description, dueDate, priority, category) => {
    const newTodos = [
      ...todos,
      {
        id: uuidv4(),
        task,
        description,
        dueDate,
        priority,
        category, 
        completed: false,
        isEditing: false,
      },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const filteredTodos = todos.filter((todo) => {
    if (categoryFilter === 'all') {
      return true; // Show all todos when 'all' is selected
    }
    return todo.category === categoryFilter; // Show todos that match the selected category
  });

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, description, priority, category, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, task, description, priority, category,  isEditing: !todo.isEditing }
        : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="TodoWrapper">
    <h1>Get Things Done!</h1>
    <TodoForm addTodo={addTodo} />
    <div className="category-buttons">
      <button onClick={() => setCategoryFilter('all')} className={categoryFilter === 'all' ? 'active' : ''}>All</button>
      <button onClick={() => setCategoryFilter('work')}  className={categoryFilter === 'work' ? 'active' : ''}>Work</button>
      <button onClick={() => setCategoryFilter('personal')} className={categoryFilter === 'personal' ? 'active' : ''}>Personal</button>
      <button onClick={() => setCategoryFilter('school')}  className={categoryFilter === 'school' ? 'active' : ''}>School</button>
    </div>
    {filteredTodos.map((todo) =>
      todo.isEditing ? (
        <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
      ) : (
        <Todo
          task={todo}
          key={todo.id}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      )
    )}
  </div>
  );
};
