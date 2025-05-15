import { EntrevistaData } from '../types/types';

export const datosEjemplo: EntrevistaData = {
  titulo: "Introducción a la Energía Solar",
  audioTitulo: "audios/intro_energia_solar.mp3", 
  fondoPregunta: "images/fondo_pregunta.png",
  fondoRespuesta: "images/fondo_respuesta.png",
  fondoTitulo: "images/portada_titulo.png",
  items: [
    {
      pregunta: "¿Qué es la energía solar?",
      respuesta: "La energía solar es la radiación electromagnética que emite el sol.",
      audioPregunta: "audios/q1_que_es_energia_solar.mp3",
      audioRespuesta: "audios/a1_que_es_energia_solar.mp3"
    },
    {
      pregunta: "¿Cuáles son los tipos de energía solar?",
      respuesta: "Existen principalmente la solar térmica y la fotovoltaica.",
      audioPregunta: "audios/q1_que_es_energia_solar.mp3",
      audioRespuesta: "audios/a1_que_es_energia_solar.mp3"
    },
    {
      pregunta: "¿Qué ventajas tiene?",
      respuesta: "Es limpia, renovable y reduce la dependencia de combustibles fósiles.",
      audioPregunta: "audios/q1_que_es_energia_solar.mp3",
      audioRespuesta: "audios/a1_que_es_energia_solar.mp3"
    }
  ]
};