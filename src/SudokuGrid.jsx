import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuGrid = ({ sudokuArray, onCellValueChange }) => {
    return (
        <table>
            <tbody>
                {sudokuArray.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((value, colIndex) => (
                            <SudokuCell
                                key={colIndex}
                                value={value}
                                onChange={(newValue) =>
                                    onCellValueChange(rowIndex, colIndex, newValue)
                                }
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SudokuGrid;
