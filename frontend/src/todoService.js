// src/todoService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos'; // Change the URL if your backend runs on a different port

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
