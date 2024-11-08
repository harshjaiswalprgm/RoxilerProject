// src/components/StatisticsBox.js
import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../api';

const StatisticsBox = ({ selectedMonth }) => {
    const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

    useEffect(() => {
        fetchStatistics(selectedMonth).then(response => {
            setStats(response.data);
        });
    }, [selectedMonth]);

    return (
        <div>
            <h3>Statistics - {selectedMonth}</h3>
            <p>Total Sale: {stats.totalSale}</p>
            <p>Total Sold Items: {stats.totalSoldItems}</p>
            <p>Total Not Sold Items: {stats.totalNotSoldItems}</p>
        </div>
    );
};

export default StatisticsBox;
