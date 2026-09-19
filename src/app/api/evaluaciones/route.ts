import { NextResponse } from 'next/server';

/**
 * [FUTURO VPS / BACKEND] Endpoint CRUD de Evaluaciones de Vehículos
 * 
 * En la fase inicial (Vercel / Local), las evaluaciones se persisten en localStorage.
 * Al desplegar en VPS con Node.js y Base de Datos, este endpoint permitirá:
 * - GET: Listar historial de evaluaciones del usuario o por placa
 * - POST: Guardar una evaluación en la base de datos centralizada
 * - PUT: Actualizar estado de peritaje
 * - DELETE: Eliminar evaluación archivada
 */
export async function GET() {
  return NextResponse.json(
    {
      mensaje: 'Endpoint de evaluaciones preparado para integración con base de datos en VPS.',
      modo: 'cliente_local_storage',
      total: 0,
      data: [],
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      {
        exito: true,
        mensaje: 'Evaluación recibida (mock para futura persistencia en base de datos).',
        idGenerado: 'eval-' + Date.now(),
        datosRecibidos: body,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Formato de datos inválido' },
      { status: 400 }
    );
  }
}
