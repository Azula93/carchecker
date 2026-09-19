import { NextResponse } from 'next/server';

/**
 * [FUTURO VPS / BACKEND] Endpoint de Autenticación de Usuarios
 * 
 * En la fase inicial (Vercel / Estático), CarCheck funciona 100% en el cliente usando localStorage.
 * Cuando se migre al VPS o se integre base de datos (PostgreSQL, Supabase o MongoDB),
 * este endpoint gestionará:
 * - Login con JWT o Cookies de sesión segura
 * - Registro de inspectores / usuarios
 * - Recuperación de contraseña
 */
export async function POST() {
  return NextResponse.json(
    {
      mensaje: 'Endpoint de autenticación preparado para futura integración de backend en VPS.',
      version: '1.0.0',
      estado: 'ready_for_database',
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      autenticado: false,
      mensaje: 'Modo cliente activo. No se requiere sesión para realizar evaluaciones.',
    },
    { status: 200 }
  );
}
