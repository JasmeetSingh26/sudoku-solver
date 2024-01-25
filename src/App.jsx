// App.jsx
import React, { useState } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid';

const App = () => {


  const isValidMove = (board, row, col, num) => {
    const gridSize = 9;

    // Check row and column for conflicts
    for (let i = 0; i < gridSize; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false; // Conflict found
      }
    }

    // Check the 3*3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return false; // Conflict found
        }
      }
    }

    return true; // No conflicts found
  };


  const initializeSudokuArray = () => {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  };
  const [sudokuArray, setSudokuArray] = useState(initializeSudokuArray());

  const handleSolveClick = () => {
    const solvedArray = solveSudokuHelper([...sudokuArray]);
    setSudokuArray(solvedArray);
  };

  const handleRestClick = () => {
    setSudokuArray(initializeSudokuArray());
  }

  const handleCellValueChange = (row, col, value) => {
    if ((isValidInput(value) || value === '') && isValidMove(sudokuArray, row, col, value)) {
      const updatedSudokuArray = [...sudokuArray];
      updatedSudokuArray[row][col] = value === '' ? 0 : parseInt(value, 10);
      setSudokuArray(updatedSudokuArray);
    } else {
      alert("Invalid Input");
    }
  };

  const isValidInput = (value) => {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) && intValue >= 1 && intValue <= 9;
  };


  // Backtracking Sudoku solving algorithm
  const solveSudokuHelper = (board) => {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;

              // Recursively attempt to solve the Sudoku
              if (solveSudokuHelper(board)) {
                return [...board]; // Puzzle solved
              }

              board[row][col] = 0; // Backtrack
            }
          }
          return false; // No valid number found
        }
      }
    }

    return [...board]; // All cells filled
  };



  return (
    <div>
      <h1>Sudoku Solver</h1>
      <SudokuGrid
        sudokuArray={sudokuArray}
        onCellValueChange={handleCellValueChange}
      />
      <div>
        <button onClick={handleSolveClick}>Solve Puzzle</button>
        <button onClick={handleRestClick}>Reset</button>
      </div>


    </div>

  );
};

export default App;
