import { NextRequest, NextResponse } from 'next/server';
import { consultarPrecioGasolina } from '@/lib/services/gasolina-service';
import { validateStringLength } from '@/lib/validation/api-validators';
import { RespuestaGasolinaAPI } from '@/types/external-data';

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(request: NextRequest): Promise<NextResponse<RespuestaGasolinaAPI>> {
  const { searchParams } = new URL(request.url);
  const ciudadRaw = searchParams.get('ciudad');

  let ciudad: string | undefined;

  if (ciudadRaw !== null && ciudadRaw !== '') {
    const ciudadVal = validateStringLength(ciudadRaw, 80, 'ciudad');
    if (!ciudadVal.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'not_available',
          message: ciudadVal.error || 'Nombre de ciudad inválido.',
        },
        { status: 400 }
      );
    }
    ciudad = ciudadVal.value;
  }

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
