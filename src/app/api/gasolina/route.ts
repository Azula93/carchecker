import { NextRequest, NextResponse } from 'next/server';
import { consultarPrecioGasolina } from '@/lib/services/gasolina-service';
import { RespuestaGasolinaAPI } from '@/types/external-data';

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(request: NextRequest): Promise<NextResponse<RespuestaGasolinaAPI>> {
  const { searchParams } = new URL(request.url);
  const ciudad = searchParams.get('ciudad') || undefined;

  const resultado = await consultarPrecioGasolina(ciudad);

  const httpStatus = resultado.success
    ? 200
    : resultado.status === 'not_available'
    ? 200 // 200 para que el frontend procese controladamente el estado not_available sin error HTTP
    : 503;

  return NextResponse.json(resultado, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
