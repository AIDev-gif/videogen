export interface EntrevistaItem {
  pregunta: string;
  respuesta: string;
  audioPregunta: string;
  audioRespuesta: string;
}

export interface EntrevistaData {
  titulo: string;
  audioTitulo: string;
  fondoTitulo: string;
  fondoPregunta: string;
  fondoRespuesta: string;
  items: EntrevistaItem[];
}