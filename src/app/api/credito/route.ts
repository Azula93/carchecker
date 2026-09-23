import { NextRequest, NextResponse } from 'next/server';
import { obtenerTasaCreditoVigente } from '@/lib/services/credito-service';
import { RespuestaCreditoAPI } from '@/types/external-data';

// Revalidar en Next.js cada 12 horas (43200 segundos)
export const revalidate = 43200;

export async function GET(
  request: NextRequest
): Promise<NextResponse<RespuestaCreditoAPI>> {
  const { searchParams } = new URL(request.url);
  const forzar = searchParams.get('forzar') === 'true';

  const resultado = await obtenerTasaCreditoVigente(forzar);

  // Se retorna HTTP 200 en casos manejados de negocio (éxito, cached, stale_data o not_available)
  // para permitir que la interfaz de usuario procese las banderas semánticas sin provocar errores no capturados.
  // En caso de caída de la fuente oficial sin datos en caché, se responde 503 Service Unavailable.
  const httpStatus =
    resultado.success ||
    resultado.status === 'stale_data' ||
    resultado.status === 'not_available'
      ? 200
      : 503;

  return NextResponse.json(resultado, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'public, s-maxage=43200, stale-while-revalidate=21600',
    },
  });
}
