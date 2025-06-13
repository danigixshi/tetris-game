import React from 'react';

const GameBoard = ({ board }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="board-cell"
              style={{
                backgroundColor: cell || '#1a1a1a',
                border: cell ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;

