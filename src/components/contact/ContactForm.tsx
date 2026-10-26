'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, RotateCcw } from 'lucide-react';

const ASUNTOS = [
  'Preguntas sobre cómo usar EscaneApp',
  'Reportar un error técnico o fallo en la web',
  'Sugerencia de nueva función o cálculo',
  'Consulta general o alianzas',
];

export const ContactForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState(ASUNTOS[0]);
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) {
      setError('Por favor escribe tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor escribe un correo electrónico válido para poder responderte.');
      return;
    }
    if (!mensaje.trim() || mensaje.trim().length < 10) {
      setError('Por favor cuéntanos un poco más sobre tu consulta (mínimo 10 letras).');
      return;
    }

    // Preparar el mailto para el envío seguro directo
    const emailDestino = 'azuladev93@gmail.com';
    const subjectEncoded = encodeURIComponent(`[EscaneApp] ${asunto} - ${nombre}`);
    const bodyEncoded = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo de respuesta: ${email}\nTipo de consulta: ${asunto}\n\nMensaje:\n${mensaje}\n\n---\nEnviado desde el formulario oficial de EscaneApp Colombia`
    );

    const mailtoUrl = `mailto:${emailDestino}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    try {
      window.location.href = mailtoUrl;
      setEnviado(true);
    } catch {
      setError('No se pudo abrir automáticamente tu aplicación de correo. Por favor escríbenos directamente a azuladev93@gmail.com.');
    }
  };

  const handleReset = () => {
    setNombre('');
    setEmail('');
    setAsunto(ASUNTOS[0]);
    setMensaje('');
    setEnviado(false);
    setError(null);
  };

  if (enviado) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            ¡Mensaje preparado con éxito!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Se abrió tu aplicación de correo con todos los datos organizados para enviar a <strong className="text-slate-900 font-mono">azuladev93@gmail.com</strong>.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl max-w-md mx-auto text-left text-xs text-slate-600 space-y-1.5 font-mono">
          <p><strong className="text-slate-900">Destinatario:</strong> azuladev93@gmail.com</p>
          <p><strong className="text-slate-900">Asunto:</strong> [EscaneApp] {asunto}</p>
          <p><strong className="text-slate-900">Remitente:</strong> {nombre} ({email})</p>
        </div>
        <p className="text-xs text-slate-500">
          Respondemos personalmente, habitualmente en menos de 24 horas hábiles.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Enviar otro mensaje</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5"
    >
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
          CANAL DIRECTO
        </span>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          Envíanos un mensaje
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Escribe tus datos y con gusto te responderemos lo más pronto posible.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-nombre"
          className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono"
        >
          Nombre completo <span className="text-rose-600">*</span>
        </label>
        <input
          id="contacto-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Andrés Ramírez"
          required
          aria-required="true"
          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-2xs"
        />
      </div>

      {/* Correo Electrónico */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-email"
          className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono"
        >
          Correo electrónico <span className="text-rose-600">*</span>
        </label>
        <input
          id="contacto-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ej. andres@correo.com"
          required
          aria-required="true"
          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-2xs"
        />
      </div>

      {/* Asunto */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-asunto"
          className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono"
        >
          ¿De qué trata tu consulta? <span className="text-rose-600">*</span>
        </label>
        <select
          id="contacto-asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all cursor-pointer shadow-2xs"
        >
          {ASUNTOS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-mensaje"
          className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono"
        >
          Mensaje <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="contacto-mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe aquí tu consulta, duda o sugerencia detallada..."
          required
          aria-required="true"
          className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all resize-y shadow-2xs"
        />
      </div>

      {/* Botón de Envío */}
      <div className="pt-2 space-y-2">
        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
        >
          <Send className="w-4 h-4 text-emerald-400" />
          <span>Enviar mensaje</span>
        </button>
        <p className="text-[11px] text-slate-500 text-center">
          Al pulsar este botón se abrirá tu aplicación de correo lista con los datos organizados.
        </p>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          O si prefieres, escríbenos directamente a{' '}
          <a
            href="mailto:azuladev93@gmail.com"
            className="font-bold text-slate-900 hover:text-emerald-700 underline"
          >
            azuladev93@gmail.com
          </a>
        </span>
      </div>
    </form>
  );
};
