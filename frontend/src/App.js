// src/App.js
import React, { useState, useEffect } from 'react';
import MonthDropdown from './components/MonthDropdown';
import TransactionTable from './components/TransactionTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import './App.css';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('March'); // Default month
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data whenever selectedMonth changes
    useEffect(() => {
        fetchTransactions(selectedMonth);
        fetchStatistics(selectedMonth);
        fetchBarChartData(selectedMonth);
    }, [selectedMonth]);

    const fetchTransactions = async (month) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/transactions?month=${month}`);
            const data = await response.json();
            setTransactions(data.transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async (month) => {
        try {
            const response = await fetch(`http://localhost:5000/api/statistics?month=${month}`);
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const fetchBarChartData = async (month) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bar-chart?month=${month}`);
            const data = await response.json();
            setBarChartData(data.priceRanges);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    return (
        <div className="app">
            <h1>Transaction Dashboard</h1>
            <MonthDropdown selectedMonth={selectedMonth} onSelectMonth={setSelectedMonth} />
            <StatisticsBox selectedMonth={selectedMonth} statistics={statistics} />
            <TransactionTable selectedMonth={selectedMonth} transactions={transactions} loading={loading} />
            <BarChart selectedMonth={selectedMonth} barChartData={barChartData} />
        </div>
    );
};

export default App;