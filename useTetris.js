import { useState, useEffect, useCallback } from 'react';

// Definición de las piezas de Tetris con sus formas y colores
const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00FFFF' // Cian
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#FFFF00' // Amarillo
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#800080' // Púrpura
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00FF00' // Verde
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#FF0000' // Rojo
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000FF' // Azul
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#FFA500' // Naranja
  }
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Crear tablero vacío
const createEmptyBoard = () => {
  return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(null));
};

// Obtener pieza aleatoria
const getRandomTetromino = () => {
  const tetrominoKeys = Object.keys(TETROMINOS);
  const randomKey = tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  return {
    type: randomKey,
    shape: TETROMINOS[randomKey].shape,
    color: TETROMINOS[randomKey].color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[randomKey].shape[0].length / 2),
    y: 0
  };
};

// Rotar matriz 90 grados en sentido horario
const rotateMatrix = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array(cols).fill().map(() => Array(rows).fill(0));
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = matrix[i][j];
    }
  }
  
  return rotated;
};

// Verificar si la posición es válida
const isValidPosition = (board, piece, x, y) => {
  for (let py = 0; py < piece.shape.length; py++) {
    for (let px = 0; px < piece.shape[py].length; px++) {
      if (piece.shape[py][px]) {
        const newX = x + px;
        const newY = y + py;
        
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        
        if (newY >= 0 && board[newY][newX]) {
          return false;
        }
      }
    }
  }
  
  return true;
};

// Colocar pieza en el tablero
const placePiece = (board, piece) => {
  const newBoard = board.map(row => [...row]);
  
  for (let py = 0; py < piece.shape.length; py++) {
    for (let px = 0; px < piece.shape[py].length; px++) {
      if (piece.shape[py][px]) {
        const x = piece.x + px;
        const y = piece.y + py;
        
        if (y >= 0) {
          newBoard[y][x] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

// Limpiar líneas completas
const clearLines = (board) => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { board: newBoard, linesCleared };
};

export const useTetris = () => {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino);
  const [nextPiece, setNextPiece] = useState(getRandomTetromino);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Mover pieza hacia abajo
  const moveDown = useCallback(() => {
    if (gameOver || isPaused) return;

    setCurrentPiece(piece => {
      if (isValidPosition(board, piece, piece.x, piece.y + 1)) {
        return { ...piece, y: piece.y + 1 };
      } else {
        // La pieza no puede moverse más, colocarla en el tablero
        const newBoard = placePiece(board, piece);
        const { board: clearedBoard, linesCleared } = clearLines(newBoard);
        
        setBoard(clearedBoard);
        setLines(prev => prev + linesCleared);
        setScore(prev => prev + (linesCleared * 100 * level));
        setLevel(prev => Math.floor((lines + linesCleared) / 10) + 1);
        
        // Generar nueva pieza
        const newPiece = nextPiece;
        setNextPiece(getRandomTetromino());
        
        // Verificar game over
        if (!isValidPosition(clearedBoard, newPiece, newPiece.x, newPiece.y)) {
          setGameOver(true);
          return piece;
        }
        
        return newPiece;
      }
    });
  }, [board, gameOver, isPaused, level, lines, nextPiece]);

  // Mover pieza horizontalmente
  const moveHorizontal = useCallback((direction) => {
    if (gameOver || isPaused) return;

    setCurrentPiece(piece => {
      const newX = piece.x + direction;
      if (isValidPosition(board, piece, newX, piece.y)) {
        return { ...piece, x: newX };
      }
      return piece;
    });
  }, [board, gameOver, isPaused]);

  // Rotar pieza
  const rotatePiece = useCallback(() => {
    if (gameOver || isPaused) return;

    setCurrentPiece(piece => {
      const rotatedShape = rotateMatrix(piece.shape);
      const rotatedPiece = { ...piece, shape: rotatedShape };
      
      if (isValidPosition(board, rotatedPiece, piece.x, piece.y)) {
        return rotatedPiece;
      }
      
      // Intentar ajustar la posición si la rotación no es válida
      for (let offset = 1; offset <= 2; offset++) {
        if (isValidPosition(board, rotatedPiece, piece.x - offset, piece.y)) {
          return { ...rotatedPiece, x: piece.x - offset };
        }
        if (isValidPosition(board, rotatedPiece, piece.x + offset, piece.y)) {
          return { ...rotatedPiece, x: piece.x + offset };
        }
      }
      
      return piece;
    });
  }, [board, gameOver, isPaused]);

  // Caída rápida
  const hardDrop = useCallback(() => {
    if (gameOver || isPaused) return;

    setCurrentPiece(piece => {
      let newY = piece.y;
      while (isValidPosition(board, piece, piece.x, newY + 1)) {
        newY++;
      }
      return { ...piece, y: newY };
    });
  }, [board, gameOver, isPaused]);

  // Pausar/reanudar juego
  const togglePause = useCallback(() => {
    if (!gameOver) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomTetromino());
    setNextPiece(getRandomTetromino());
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
  }, []);

  // Obtener el tablero con la pieza actual
  const getBoardWithCurrentPiece = useCallback(() => {
    const boardWithPiece = board.map(row => [...row]);
    
    for (let py = 0; py < currentPiece.shape.length; py++) {
      for (let px = 0; px < currentPiece.shape[py].length; px++) {
        if (currentPiece.shape[py][px]) {
          const x = currentPiece.x + px;
          const y = currentPiece.y + py;
          
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            boardWithPiece[y][x] = currentPiece.color;
          }
        }
      }
    }
    
    return boardWithPiece;
  }, [board, currentPiece]);

  // Efecto para el movimiento automático hacia abajo
  useEffect(() => {
    if (gameOver || isPaused) return;

    const dropTime = Math.max(50, 1000 - (level - 1) * 50);
    const interval = setInterval(moveDown, dropTime);
    
    return () => clearInterval(interval);
  }, [moveDown, level, gameOver, isPaused]);

  return {
    board: getBoardWithCurrentPiece(),
    currentPiece,
    nextPiece,
    score,
    lines,
    level,
    gameOver,
    isPaused,
    moveDown,
    moveLeft: () => moveHorizontal(-1),
    moveRight: () => moveHorizontal(1),
    rotatePiece,
    hardDrop,
    togglePause,
    resetGame
  };
};

