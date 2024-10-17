import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import { getTodos, createTodo, updateTodo, deleteTodo as deleteTodoService } from "../todoService";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      const savedTodos = await getTodos(); 
      console.log("Fetched Todos: ", savedTodos); 
      setTodos(savedTodos);
    };

    fetchTodos();
  }, []);

  const addTodo = async (task, description, dueDate, priority, category) => {
    const newTodo = {
      task,
      description,
      dueDate,
      priority,
      category,
      completed: false,
    };

    const createdTodo = await createTodo(newTodo); 
    setTodos((prevTodos) => [...prevTodos, createdTodo]);
  };

  const filteredTodos = todos.filter((todo) => {
    if (categoryFilter === 'all') {
      return true;
    }
    return todo.category === categoryFilter;
  });

  const toggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    
    await updateTodo(id, updatedTodo); 
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === id ? updatedTodo : t))
    );
  };

  const deleteTodo = async (id) => {
    await deleteTodoService(id); 
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, description, priority, category, id) => {
    const updatedTodo = {
      task,
      description,
      priority,
      category,
    };

    await updateTodo(id, updatedTodo); 
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <div className="category-buttons">
        <button onClick={() => setCategoryFilter('all')} className={categoryFilter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setCategoryFilter('work')} className={categoryFilter === 'work' ? 'active' : ''}>Work</button>
        <button onClick={() => setCategoryFilter('personal')} className={categoryFilter === 'personal' ? 'active' : ''}>Personal</button>
        <button onClick={() => setCategoryFilter('school')} className={categoryFilter === 'school' ? 'active' : ''}>School</button>
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
