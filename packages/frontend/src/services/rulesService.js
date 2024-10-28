// src/services/rulesService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/rules'; // ajuste se necessário

export const getRules = () => axios.get(API_URL);
export const createRule = (data) => axios.post(API_URL, data);
export const updateRule = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRule = (id) => axios.delete(`${API_URL}/${id}`);
