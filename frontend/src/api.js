// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = (month, search, page, perPage) => 
    axios.get(`${API_BASE_URL}/transactions`, { params: { month, search, page, perPage } });

export const fetchStatistics = (month) => 
    axios.get(`${API_BASE_URL}/statistics`, { params: { month } });

export const fetchBarChart = (month) => 
    axios.get(`${API_BASE_URL}/barchart`, { params: { month } });

export const fetchPieChart = (month) => 
    axios.get(`${API_BASE_URL}/piechart`, { params: { month } });
