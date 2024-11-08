// src/components/BarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../api';

const BarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetchBarChart(selectedMonth).then(response => {
            const labels = response.data.map(item => `${item._id}`);
            const data = response.data.map(item => item.count);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Number of items',
                        data,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                    }
                ]
            });
        });
    }, [selectedMonth]);

    return (
        <div>
            <h3>Bar Chart Stats - {selectedMonth}</h3>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChart;
