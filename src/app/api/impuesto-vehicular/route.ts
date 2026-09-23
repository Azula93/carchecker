import { NextRequest, NextResponse } from 'next/server';
import {
  consultarImpuestoVehicular,
  obtenerMarcasPorCategoria,
  obtenerLineasPorMarca,
  normalizarCategoriaImpuesto,
} from '@/lib/services/impuesto-vehicular-service';
import type { RespuestaImpuestoVehicularAPI } from '@/types/external-data';

export interface RespuestaCatalogoMarcas {
  success: boolean;
  marcas: string[];
}

export interface RespuestaCatalogoLineas {
  success: boolean;
  lineas: Array<{ id: string; linea: string; cilindraje?: number }>;
}

export type RespuestaAPIImpuesto =
  | RespuestaImpuestoVehicularAPI
  | RespuestaCatalogoMarcas
  | RespuestaCatalogoLineas;

// Revalidar en Next.js cada 24 horas (86400 segundos)
export const revalidate = 86400;

export async function GET(
  request: NextRequest
): Promise<NextResponse<RespuestaAPIImpuesto>> {
  const { searchParams } = new URL(request.url);

  // Soporte para consultas de catálogo de marcas y líneas para los selectores guiados
  const action = searchParams.get('action');
  const categoriaParam = searchParams.get('categoria') || 'automoviles';
  const categoriaOficial = normalizarCategoriaImpuesto(categoriaParam) || 'automoviles';

  if (action === 'marcas') {
    const marcas = obtenerMarcasPorCategoria(categoriaOficial);
    return NextResponse.json({ success: true, marcas });
  }

  if (action === 'lineas') {
    const marca = searchParams.get('marca') || '';
    const lineas = obtenerLineasPorMarca(categoriaOficial, marca);
    return NextResponse.json({ success: true, lineas });
  }

  // Consulta de cálculo de impuesto
  const marca = searchParams.get('marca') || undefined;
  const linea = searchParams.get('linea') || undefined;
  const idVehiculo = searchParams.get('idVehiculo') || undefined;
  const anioModeloStr = searchParams.get('anioModelo');
  const cilindrajeStr = searchParams.get('cilindraje');
  const vigenciaStr = searchParams.get('vigencia');

  const anioModelo = anioModeloStr ? parseInt(anioModeloStr, 10) : undefined;
  const cilindraje = cilindrajeStr ? parseFloat(cilindrajeStr) : undefined;
  const vigencia = vigenciaStr ? parseInt(vigenciaStr, 10) : 2026;

  const resultado = consultarImpuestoVehicular({
    vigencia,
    categoria: categoriaOficial,
    marca,
    linea,
    anioModelo,
    cilindraje,
    idVehiculo,
  });

  return NextResponse.json(resultado, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
