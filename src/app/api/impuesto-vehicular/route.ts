import { NextRequest, NextResponse } from 'next/server';
import {
  consultarImpuestoVehicular,
  obtenerMarcasPorCategoria,
  obtenerLineasPorMarca,
  normalizarCategoriaImpuesto,
} from '@/lib/services/impuesto-vehicular-service';
import {
  parseIntegerRange,
  parsePositiveNumber,
  validateStringLength,
} from '@/lib/validation/api-validators';
import type { RespuestaImpuestoVehicularAPI } from '@/types/external-data';

export interface RespuestaCatalogoMarcas {
  success: boolean;
  marcas: string[];
}

export interface RespuestaCatalogoLineas {
  success: boolean;
  lineas: Array<{ id: string; linea: string; cilindraje?: number }>;
}

export interface RespuestaErrorValidacion {
  success: boolean;
  status: 'invalid_parameter';
  message: string;
}

export type RespuestaAPIImpuesto =
  | RespuestaImpuestoVehicularAPI
  | RespuestaCatalogoMarcas
  | RespuestaCatalogoLineas
  | RespuestaErrorValidacion;

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(
  request: NextRequest
): Promise<NextResponse<RespuestaAPIImpuesto>> {
  const { searchParams } = new URL(request.url);

  // 1. Validar action (opcional: solo 'marcas' o 'lineas')
  const actionRaw = searchParams.get('action');
  if (actionRaw !== null && actionRaw !== '') {
    if (actionRaw !== 'marcas' && actionRaw !== 'lineas') {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_parameter',
          message: 'Acción no permitida. Opciones válidas: "marcas", "lineas".',
        },
        { status: 400 }
      );
    }
  }
  const action = actionRaw || null;

  // 2. Validar categoria (opcional, string <= 60 caracteres)
  const catVal = validateStringLength(searchParams.get('categoria'), 60, 'categoria');
  if (!catVal.valid) {
    return NextResponse.json(
      {
        success: false,
        status: 'invalid_parameter',
        message: catVal.error || 'Categoría inválida.',
      },
      { status: 400 }
    );
  }
  const categoriaParam = catVal.value || 'automoviles';
  const categoriaOficial = normalizarCategoriaImpuesto(categoriaParam) || 'automoviles';

  // 3. Catálogo de marcas
  if (action === 'marcas') {
    const marcas = obtenerMarcasPorCategoria(categoriaOficial);
    return NextResponse.json({ success: true, marcas });
  }

  // 4. Catálogo de líneas por marca
  if (action === 'lineas') {
    const marcaVal = validateStringLength(searchParams.get('marca'), 80, 'marca');
    if (!marcaVal.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_parameter',
          message: marcaVal.error || 'Marca inválida.',
        },
        { status: 400 }
      );
    }
    const lineas = obtenerLineasPorMarca(categoriaOficial, marcaVal.value || '');
    return NextResponse.json({ success: true, lineas });
  }

  // 5. Parámetros de cálculo de impuesto
  const marcaVal = validateStringLength(searchParams.get('marca'), 80, 'marca');
  if (!marcaVal.valid) {
    return NextResponse.json(
      { success: false, status: 'invalid_parameter', message: marcaVal.error! },
      { status: 400 }
    );
  }

  const lineaVal = validateStringLength(searchParams.get('linea'), 120, 'linea');
  if (!lineaVal.valid) {
    return NextResponse.json(
      { success: false, status: 'invalid_parameter', message: lineaVal.error! },
      { status: 400 }
    );
  }

  const idVehiculoVal = validateStringLength(searchParams.get('idVehiculo'), 150, 'idVehiculo');
  if (!idVehiculoVal.valid) {
    return NextResponse.json(
      { success: false, status: 'invalid_parameter', message: idVehiculoVal.error! },
      { status: 400 }
    );
  }

  // anioModelo (opcional en query, pero si se envía debe ser entero válido [1900, 2028])
  let anioModelo: number | undefined;
  const anioModeloStr = searchParams.get('anioModelo');
  if (anioModeloStr !== null && anioModeloStr !== '') {
    const res = parseIntegerRange(anioModeloStr, 1900, 2028, 'anioModelo');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_parameter',
          message: res.error || 'El año del modelo debe ser un número entero válido entre 1900 y 2028.',
        },
        { status: 400 }
      );
    }
    anioModelo = res.value;
  }

  // cilindraje (opcional, número positivo [1, 15000])
  let cilindraje: number | undefined;
  const cilindrajeStr = searchParams.get('cilindraje');
  if (cilindrajeStr !== null && cilindrajeStr !== '') {
    const res = parsePositiveNumber(cilindrajeStr, 1, 15000, 'cilindraje');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_parameter',
          message: res.error || 'El cilindraje debe ser un número positivo entre 1 y 15.000 c.c.',
        },
        { status: 400 }
      );
    }
    cilindraje = res.value;
  }

  // vigencia (opcional, entero [2000, 2030], por defecto 2026)
  let vigencia = 2026;
  const vigenciaStr = searchParams.get('vigencia');
  if (vigenciaStr !== null && vigenciaStr !== '') {
    const res = parseIntegerRange(vigenciaStr, 2000, 2030, 'vigencia');
    if (!res.valid) {
      return NextResponse.json(
        {
          success: false,
          status: 'invalid_parameter',
          message: res.error || 'La vigencia fiscal debe ser un año válido entre 2000 y 2030.',
        },
        { status: 400 }
      );
    }
    vigencia = res.value!;
  }

  const resultado = consultarImpuestoVehicular({
    vigencia,
    categoria: categoriaOficial,
    marca: marcaVal.value || undefined,
    linea: lineaVal.value || undefined,
    anioModelo,
    cilindraje,
    idVehiculo: idVehiculoVal.value || undefined,
  });

  return NextResponse.json(resultado, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
