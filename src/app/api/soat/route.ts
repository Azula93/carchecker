import { NextRequest, NextResponse } from 'next/server';
import { obtenerTarifaSoat } from '@/lib/services/soat-service';
import { RespuestaSoatAPI } from '@/types/external-data';

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(
  request: NextRequest
): Promise<NextResponse<RespuestaSoatAPI>> {
  const { searchParams } = new URL(request.url);

  const categoria = searchParams.get('categoria') || '';
  const cilindrajeStr = searchParams.get('cilindraje');
  const anioModeloStr = searchParams.get('anioModelo');
  const anioTarifaStr = searchParams.get('anioTarifa');
  const pasajerosStr = searchParams.get('pasajeros');
  const capacidadTonStr = searchParams.get('capacidadToneladas');

  const cilindraje = cilindrajeStr ? parseFloat(cilindrajeStr) : undefined;
  const anioModelo = anioModeloStr ? parseInt(anioModeloStr, 10) : undefined;
  const anioTarifa = anioTarifaStr ? parseInt(anioTarifaStr, 10) : undefined;
  const pasajeros = pasajerosStr ? parseInt(pasajerosStr, 10) : undefined;
  const capacidadToneladas = capacidadTonStr ? parseFloat(capacidadTonStr) : undefined;

  const resultado = obtenerTarifaSoat({
    categoria,
    cilindraje,
    anioModelo,
    anioTarifa,
    pasajeros,
    capacidadToneladas,
  });

  const httpStatus = resultado.success ? 200 : 200; // 200 para permitir que el frontend procese el estado de negocio de forma controlada

  return NextResponse.json(resultado, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
