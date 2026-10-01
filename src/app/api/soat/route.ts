import { NextRequest, NextResponse } from 'next/server';
import { obtenerTarifaSoat } from '@/lib/services/soat-service';
import {
  parseIntegerRange,
  parsePositiveNumber,
  validateStringLength,
} from '@/lib/validation/api-validators';
import { RespuestaSoatAPI } from '@/types/external-data';

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(
  request: NextRequest
): Promise<NextResponse<RespuestaSoatAPI>> {
  const { searchParams } = new URL(request.url);

  // 1. Validar categoría (obligatoria, string <= 100 caracteres)
  const categoriaVal = validateStringLength(
    searchParams.get('categoria'),
    100,
    'categoria'
  );
  if (!categoriaVal.valid || !categoriaVal.value) {
    return NextResponse.json(
      {
        success: false,
        status: 'category_not_found',
        message:
          categoriaVal.error ||
          'El parámetro "categoria" es requerido y no puede estar vacío.',
      },
      { status: 400 }
    );
  }

  // 2. Validar cilindraje (opcional, número positivo entre 1 y 15.000 c.c.)
  let cilindraje: number | undefined;
  const cilindrajeStr = searchParams.get('cilindraje');
  if (cilindrajeStr !== null && cilindrajeStr !== '') {
    const res = parsePositiveNumber(cilindrajeStr, 1, 15000, 'cilindraje');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_vehicle_data',
          message: res.error,
        },
        { status: 400 }
      );
    }
    cilindraje = res.value;
  }

  // 3. Validar anioModelo (opcional, entero entre 1900 y 2028)
  let anioModelo: number | undefined;
  const anioModeloStr = searchParams.get('anioModelo');
  if (anioModeloStr !== null && anioModeloStr !== '') {
    const res = parseIntegerRange(anioModeloStr, 1900, 2028, 'anioModelo');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_vehicle_data',
          message: res.error,
        },
        { status: 400 }
      );
    }
    anioModelo = res.value;
  }

  // 4. Validar anioTarifa (opcional, entero entre 2020 y 2030)
  let anioTarifa: number | undefined;
  const anioTarifaStr = searchParams.get('anioTarifa');
  if (anioTarifaStr !== null && anioTarifaStr !== '') {
    const res = parseIntegerRange(anioTarifaStr, 2020, 2030, 'anioTarifa');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_vehicle_data',
          message: res.error,
        },
        { status: 400 }
      );
    }
    anioTarifa = res.value;
  }

  // 5. Validar pasajeros (opcional, entero entre 1 y 120)
  let pasajeros: number | undefined;
  const pasajerosStr = searchParams.get('pasajeros');
  if (pasajerosStr !== null && pasajerosStr !== '') {
    const res = parseIntegerRange(pasajerosStr, 1, 120, 'pasajeros');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_vehicle_data',
          message: res.error,
        },
        { status: 400 }
      );
    }
    pasajeros = res.value;
  }

  // 6. Validar capacidadToneladas (opcional, número positivo entre 0.1 y 100)
  let capacidadToneladas: number | undefined;
  const capacidadTonStr = searchParams.get('capacidadToneladas');
  if (capacidadTonStr !== null && capacidadTonStr !== '') {
    const res = parsePositiveNumber(capacidadTonStr, 0.1, 100, 'capacidadToneladas');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_vehicle_data',
          message: res.error,
        },
        { status: 400 }
      );
    }
    capacidadToneladas = res.value;
  }

  const resultado = obtenerTarifaSoat({
    categoria: categoriaVal.value,
    cilindraje,
    anioModelo,
    anioTarifa,
    pasajeros,
    capacidadToneladas,
  });

  // 200 en estados de negocio controlados (ej. category_not_found para el frontend)
  const httpStatus = resultado.success ? 200 : 200;

  return NextResponse.json(resultado, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
