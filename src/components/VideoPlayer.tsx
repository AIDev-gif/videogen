'use client';

import { useEffect, useState } from 'react';
import { EntrevistaData } from '../types/types';

interface VideoPlayerProps {
  data: EntrevistaData;
  isPlaying: boolean;
  currentSlide: number;
  showingAnswer: boolean;
  onNext: () => void;
}

export default function VideoPlayer({ 
  data, 
  isPlaying, 
  currentSlide, 
  showingAnswer,
  onNext 
}: VideoPlayerProps) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      return;
    }

    let audio: HTMLAudioElement;
    
    if (currentSlide === 0) {
      audio = new Audio(data.audioTitulo);
    } else {
      const currentItem = data.items[currentSlide - 1];
      audio = new Audio(showingAnswer ? currentItem.audioRespuesta : currentItem.audioPregunta);
    }

    // Configurar eventos del audio
    audio.onplay = () => setIsAudioPlaying(true);
    audio.onpause = () => setIsAudioPlaying(false);
    audio.onended = () => {
      setIsAudioPlaying(false);
      if (isPlaying) {
        // Pequeño retraso para asegurar una transición suave
        setTimeout(() => {
          onNext();
        }, 500);
      }
    };

    setCurrentAudio(audio);
    audio.play().catch(error => console.error('Error reproduciendo audio:', error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsAudioPlaying(false);
    };
  }, [currentSlide, showingAnswer, isPlaying, data, onNext]);

  return (
    <div className="aspect-video bg-black relative">
      {currentSlide === 0 ? (
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.fondoTitulo})`
          }}
        >
          <h1 className="text-6xl text-gray-800 font-bold text-center leading-tight max-w-4xl">
            {data.titulo}
          </h1>
        </div>
      ) : (
        <div 
          className="absolute inset-0 flex items-center justify-center p-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(${showingAnswer ? data.fondoRespuesta : data.fondoPregunta})`
          }}
        >
          <div className="text-center max-w-4xl mx-auto">
            {!showingAnswer ? (
              <h2 className="text-5xl text-gray-800 font-semibold leading-tight">
                {data.items[currentSlide - 1].pregunta}
              </h2>
            ) : (
              <h2 className="text-4xl text-gray-800 font-semibold leading-tight">
                {data.items[currentSlide - 1].respuesta}
              </h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}