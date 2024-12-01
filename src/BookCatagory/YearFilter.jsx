import React from 'react';

const YearFilter = ({ selectedYear, onYearChange, onFilterApply, availableYears }) => {
    const handleYearChange = (event) => {
        onYearChange(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <select value={selectedYear.toString()} onChange={handleYearChange}>
                {availableYears.sort((a, b) => a - b).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <button className="btn btn-primary" onClick={onFilterApply}>Filter by Year</button>
        </div>
    );
};

export default YearFilter;
