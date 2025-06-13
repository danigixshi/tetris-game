import React from 'react';

const NextPiece = ({ piece }) => {
  const renderPreview = () => {
    const maxSize = 4;
    const grid = Array(maxSize).fill().map(() => Array(maxSize).fill(null));
    
    // Centrar la pieza en la cuadrícula de vista previa
    const offsetY = Math.floor((maxSize - piece.shape.length) / 2);
    const offsetX = Math.floor((maxSize - piece.shape[0].length) / 2);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          grid[y + offsetY][x + offsetX] = piece.color;
        }
      }
    }
    
    return grid;
  };

  const previewGrid = renderPreview();

  return (
    <div className="next-piece">
      <h3 className="text-lg font-bold mb-2 text-white">Siguiente</h3>
      <div className="next-piece-grid">
        {previewGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="next-piece-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="next-piece-cell"
                style={{
                  backgroundColor: cell || 'transparent',
                  border: cell ? '1px solid rgba(255,255,255,0.3)' : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;

