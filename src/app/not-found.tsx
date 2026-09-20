import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-sm font-mono text-slate-500 mb-3">
          ERROR 404
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-[#0F1B2B] mb-4">
          Página no encontrada
        </h1>

        <p className="text-slate-600 mb-8">
          La página que buscas no existe o ya no está disponible.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-[#0F1B2B] text-white text-sm font-semibold hover:bg-[#1A2B42] transition-colors"
        >
          Volver a Car Checker
        </Link>
      </div>
    </main>
  );
}