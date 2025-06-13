import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GameControls = ({ 
  gameOver, 
  isPaused, 
  onTogglePause, 
  onReset, 
  onMoveLeft, 
  onMoveRight, 
  onRotate, 
  onMoveDown, 
  onHardDrop 
}) => {
  return (
    <div className="game-controls">
      <div className="control-buttons mb-4">
        <Button
          onClick={onTogglePause}
          disabled={gameOver}
          className="mr-2"
          variant={isPaused ? "default" : "secondary"}
        >
          {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
          {isPaused ? 'Reanudar' : 'Pausar'}
        </Button>
        
        <Button onClick={onReset} variant="destructive">
          Nuevo Juego
        </Button>
      </div>

      <div className="instructions">
        <h3 className="text-lg font-bold text-white mb-3">Controles</h3>
        
        <div className="desktop-controls mb-4">
          <h4 className="text-md font-semibold text-gray-300 mb-2">Teclado:</h4>
          <div className="control-list text-sm text-gray-400">
            <div>← → : Mover izquierda/derecha</div>
            <div>↓ : Mover hacia abajo</div>
            <div>↑ : Rotar pieza</div>
            <div>Espacio : Caída rápida</div>
            <div>P : Pausar/Reanudar</div>
          </div>
        </div>

        <div className="mobile-controls">
          <h4 className="text-md font-semibold text-gray-300 mb-2">Botones:</h4>
          <div className="control-buttons-grid">
            <Button
              onMouseDown={onMoveLeft}
              onTouchStart={onMoveLeft}
              variant="outline"
              size="sm"
              className="control-btn"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <Button
              onMouseDown={onRotate}
              onTouchStart={onRotate}
              variant="outline"
              size="sm"
              className="control-btn"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            
            <Button
              onMouseDown={onMoveRight}
              onTouchStart={onMoveRight}
              variant="outline"
              size="sm"
              className="control-btn"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button
              onMouseDown={onMoveDown}
              onTouchStart={onMoveDown}
              variant="outline"
              size="sm"
              className="control-btn"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            
            <Button
              onMouseDown={onHardDrop}
              onTouchStart={onHardDrop}
              variant="outline"
              size="sm"
              className="control-btn col-span-2"
            >
              Caída Rápida
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;

