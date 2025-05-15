'use client';

import { EntrevistaData } from '../types/types';

interface VideoExportProps {
  data: EntrevistaData;
}

export default function VideoExport({ data }: VideoExportProps) {
  const handleExport = async () => {
    // Aquí implementaremos la lógica de exportación con Remotion
    console.log('Exportando video...');
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Exportar Video
      </button>
    </div>
  );
}