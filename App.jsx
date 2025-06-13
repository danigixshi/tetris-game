import React, { useEffect } from 'react';
import { useTetris } from './src/hooks/useTetris';
import GameBoard from './src/components/GameBoard';
import NextPiece from './src/components/NextPiece';
import GameStats from './src/components/GameStats';
import GameControls from './src/components/GameControls';
import { Button } from '@/components/ui/button.jsx';
import './App.css';

function App() {
  const {
    board,
    currentPiece,
    nextPiece,
    score,
    lines,
    level,
    gameOver,
    isPaused,
    moveDown,
    moveLeft,
    moveRight,
    rotatePiece,
    hardDrop,
    togglePause,
    resetGame
  } = useTetris();

  // Manejar controles del teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          event.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
          event.preventDefault();
          rotatePiece();
          break;
        case ' ':
          event.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, moveLeft, moveRight, moveDown, rotatePiece, hardDrop, togglePause]);

  return (
    <div className="tetris-container">
      <div className="w-full max-w-6xl">
        <div className="game-title">
          <h1>TETRIS COLORIDO</h1>
          <p className="text-lg text-gray-300">¡Disfruta del clásico juego con colores vibrantes!</p>
        </div>

        <div className="game-wrapper">
          {/* Panel izquierdo - Estadísticas */}
          <div className="side-panel">
            <GameStats score={score} lines={lines} level={level} />
            
            {gameOver && (
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-red-400 mb-2">¡Juego Terminado!</h3>
                <p className="text-gray-300 mb-4">Puntuación Final: {score.toLocaleString()}</p>
                <Button onClick={resetGame} className="w-full">
                  Jugar de Nuevo
                </Button>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-yellow-400">Juego Pausado</h3>
                <p className="text-gray-300 mt-2">Presiona P o el botón para continuar</p>
              </div>
            )}
          </div>

          {/* Tablero central */}
          <div className="relative">
            <GameBoard board={board} />
            
            {(gameOver || isPaused) && (
              <div className="game-over-overlay">
                {gameOver ? (
                  <>
                    <h2 className="text-4xl font-bold text-red-400 mb-4">GAME OVER</h2>
                    <p className="text-xl text-white mb-6">Puntuación: {score.toLocaleString()}</p>
                    <Button onClick={resetGame} size="lg">
                      Nuevo Juego
                    </Button>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl font-bold text-yellow-400 mb-4">PAUSADO</h2>
                    <Button onClick={togglePause} size="lg">
                      Reanudar
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Panel derecho - Siguiente pieza y controles */}
          <div className="side-panel">
            <NextPiece piece={nextPiece} />
            
            <GameControls
              gameOver={gameOver}
              isPaused={isPaused}
              onTogglePause={togglePause}
              onReset={resetGame}
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onRotate={rotatePiece}
              onMoveDown={moveDown}
              onHardDrop={hardDrop}
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Usa las flechas del teclado para mover, ↑ para rotar, Espacio para caída rápida, P para pausar
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

