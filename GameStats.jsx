import React from 'react';

const GameStats = ({ score, lines, level }) => {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <h3 className="text-lg font-bold text-white">Puntuación</h3>
        <p className="text-2xl font-mono text-yellow-400">{score.toLocaleString()}</p>
      </div>
      
      <div className="stat-item">
        <h3 className="text-lg font-bold text-white">Líneas</h3>
        <p className="text-2xl font-mono text-green-400">{lines}</p>
      </div>
      
      <div className="stat-item">
        <h3 className="text-lg font-bold text-white">Nivel</h3>
        <p className="text-2xl font-mono text-blue-400">{level}</p>
      </div>
    </div>
  );
};

export default GameStats;

