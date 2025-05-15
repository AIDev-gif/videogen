'use client';

interface VideoControlsProps {
  onPrevious: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  isPlaying: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function VideoControls({
  onPrevious,
  onPlayPause,
  onNext,
  isPlaying,
  canGoPrevious,
  canGoNext
}: VideoControlsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button 
        className={`px-4 py-2 text-white rounded transition-colors ${
          canGoPrevious ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        Anterior
      </button>
      
      <button 
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        onClick={onPlayPause}
      >
        {isPlaying ? 'Pausar' : 'Reproducir'}
      </button>
      
      <button 
        className={`px-4 py-2 text-white rounded transition-colors ${
          canGoNext ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={onNext}
        disabled={!canGoNext}
      >
        Siguiente
      </button>
    </div>
  );
}