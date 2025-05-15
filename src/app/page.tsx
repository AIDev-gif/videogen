'use client';

import { useState } from 'react';
import { EntrevistaData } from '../types/types';
import VideoPlayer from '../components/VideoPlayer';
import VideoControls from '../components/VideoControls';
import VideoExport from '../components/VideoExport';
import { datosEjemplo } from '../data/ejemploData';

export default function Home() {
  const [data, setData] = useState<EntrevistaData | null>(datosEjemplo);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showingAnswer, setShowingAnswer] = useState(false);

  const handleJsonInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedData = JSON.parse(event.target.value);
      setData(parsedData);
    } catch (error) {
      console.error('Error al parsear JSON:', error);
    }
  };

  const handleStart = () => {
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (showingAnswer) {
      setShowingAnswer(false);
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowingAnswer(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentSlide === 0) {
      // Transición desde el título a la primera pregunta
      setCurrentSlide(1);
      setShowingAnswer(false);
    } else if (!showingAnswer) {
      // Transición de pregunta a respuesta
      setShowingAnswer(true);
    } else if (currentSlide < (data?.items.length || 0)) {
      // Transición a la siguiente pregunta
      setCurrentSlide(currentSlide + 1);
      setShowingAnswer(false);
    }
  };

  const canGoPrevious = showingAnswer || currentSlide > 0;
  const canGoNext = !showingAnswer || currentSlide < (data?.items.length || 0);

  return (
    <main className="min-h-screen p-4 flex gap-8">
      {/* Panel izquierdo - Editor JSON */}
      <div className="w-1/3 min-w-[300px]">
        <h1 className="text-2xl font-bold mb-4">Generador de Entrevistas</h1>
        <textarea
          className="w-full h-[calc(100vh-120px)] p-4 border rounded resize-none font-mono text-sm"
          placeholder="Pega aquí tu JSON para personalizar..."
          defaultValue={JSON.stringify(datosEjemplo, null, 2)}
          onChange={handleJsonInput}
        />
      </div>

      {/* Panel derecho - Visualización y controles */}
      <div className="flex-1">
        {data && (
          <div className="sticky top-4">
            {!isPlaying ? (
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <button
                  onClick={handleStart}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition-colors"
                >
                  Comenzar Presentación
                </button>
              </div>
            ) : (
              <>
                <VideoPlayer 
                  data={data} 
                  isPlaying={isPlaying}
                  currentSlide={currentSlide}
                  showingAnswer={showingAnswer}
                  onNext={handleNext}
                />
                <VideoControls 
                  onPrevious={handlePrevious}
                  onPlayPause={handlePlayPause}
                  onNext={handleNext}
                  isPlaying={isPlaying}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                />
                <VideoExport data={data} />
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}