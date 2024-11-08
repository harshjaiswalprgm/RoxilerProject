// src/components/MonthDropdown.js
import React from 'react';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthDropdown = ({ selectedMonth, onSelectMonth }) => {
    return (
        <select value={selectedMonth} onChange={(e) => onSelectMonth(e.target.value)}>
            {months.map((month) => (
                <option key={month} value={month}>
                    {month}
                </option>
            ))}
        </select>
    );
};

export default MonthDropdown;
