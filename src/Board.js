// Board.js
import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => (
  <div className="board">
    <div className="row">
      {squares.slice(0, 3).map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </div>
    <div className="row">
      {squares.slice(3, 6).map((square, index) => (
        <Square key={index + 3} value={square} onClick={() => onClick(index + 3)} />
      ))}
    </div>
    <div className="row">
      {squares.slice(6, 9).map((square, index) => (
        <Square key={index + 6} value={square} onClick={() => onClick(index + 6)} />
      ))}
    </div>
  </div>
);

export default Board;
