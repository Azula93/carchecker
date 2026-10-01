import { NextResponse } from 'next/server';

/** Límite máximo de tamaño de cuerpo JSON permitido (100 KB) */
const MAX_PAYLOAD_BYTES = 100 * 1024;

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
    // 1. Validar Content-Length previo si el cliente lo envía
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: 'El tamaño del payload excede el límite permitido de 100KB.' },
        { status: 413 }
      );
    }

    // 2. Leer texto y verificar tamaño real
    const rawText = await request.text();
    if (rawText.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: 'El tamaño del payload excede el límite permitido de 100KB.' },
        { status: 413 }
      );
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: 'El cuerpo de la solicitud no puede estar vacío.' },
        { status: 400 }
      );
    }

    // 3. Parsear y validar que sea un objeto JSON
    let body: unknown;
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: 'Formato de datos inválido. Debe ser un JSON sintácticamente correcto.' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Formato de datos inválido. El payload debe ser un objeto JSON.' },
        { status: 400 }
      );
    }

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
      { error: 'Error interno al procesar los datos de evaluación.' },
      { status: 500 }
    );
  }
}
