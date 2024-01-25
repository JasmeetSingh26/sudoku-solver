import React from 'react';

const SudokuCell = ({ value, onChange }) => {
    const handleChange = (e) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(newValue);
    };

    return (
        <td>
            <input
                type="number"
                className="cell"
                value={value !== 0 ? value : ''}
                min="1"
                max="9"
                onChange={handleChange}
            />
        </td>
    );
};

export default SudokuCell;
