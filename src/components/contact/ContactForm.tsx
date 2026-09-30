'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, RotateCcw } from 'lucide-react';

const ASUNTOS = [
  'Preguntas sobre EscaneApp',
  'Reportar un error',
  'Sugerencias o comentarios',
  'Consultas generales',
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
      setError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!mensaje.trim() || mensaje.trim().length < 10) {
      setError('Por favor detalla tu mensaje (mínimo 10 caracteres).');
      return;
    }

    // Preparar el mailto para el envío seguro directo
    const emailDestino = 'azuladev93@gmail.com';
    const subjectEncoded = encodeURIComponent(`[EscaneApp] ${asunto} - ${nombre}`);
    const bodyEncoded = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo de contacto: ${email}\nTipo de consulta: ${asunto}\n\nMensaje:\n${mensaje}\n\n---\nEnviado desde el formulario de contacto de EscaneApp Colombia`
    );

    const mailtoUrl = `mailto:${emailDestino}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    try {
      window.location.href = mailtoUrl;
      setEnviado(true);
    } catch {
      setError('No se pudo abrir el cliente de correo. Por favor escribe directamente a azuladev93@gmail.com.');
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
      <div className="bg-white border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-4 animate-fadeIn">
        <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#2EAD68] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-[#17212B]">
            ¡Mensaje preparado con éxito!
          </h3>
          <p className="text-sm text-[#66727D] max-w-md mx-auto leading-relaxed">
            Se ha abierto tu cliente de correo con los datos preparados para enviar a <strong className="text-[#123B5D]">azuladev93@gmail.com</strong>.
          </p>
        </div>
        <div className="bg-[#F7F9FA] border border-[#E2E8F0] p-4 rounded-xl max-w-md mx-auto text-left text-xs text-[#66727D] space-y-1.5">
          <p><strong className="text-[#17212B]">Destinatario:</strong> azuladev93@gmail.com</p>
          <p><strong className="text-[#17212B]">Asunto:</strong> [EscaneApp] {asunto}</p>
          <p><strong className="text-[#17212B]">Remitente:</strong> {nombre} ({email})</p>
        </div>
        <p className="text-xs text-[#66727D] italic">
          Tiempo promedio de respuesta: menos de 24 horas hábiles.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#123B5D] text-xs font-bold transition-all cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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
      className="bg-white border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5"
    >
      <div className="border-b border-[#E2E8F0] pb-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-[#17212B]">
          Envíanos un mensaje
        </h3>
        <p className="text-xs sm:text-sm text-[#66727D] mt-1">
          Completa los campos a continuación y te responderemos lo más pronto posible.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#D64545] text-xs font-medium flex items-center gap-2.5 animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-[#D64545]" />
          <span>{error}</span>
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-nombre"
          className="block text-xs font-bold text-[#17212B] uppercase tracking-wider font-mono"
        >
          Nombre completo <span className="text-[#D64545]">*</span>
        </label>
        <input
          id="contacto-nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Juan Pérez"
          required
          aria-required="true"
          className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#17212B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B5D] focus:border-[#123B5D] transition-all"
        />
      </div>

      {/* Correo Electrónico */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-email"
          className="block text-xs font-bold text-[#17212B] uppercase tracking-wider font-mono"
        >
          Correo electrónico <span className="text-[#D64545]">*</span>
        </label>
        <input
          id="contacto-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ej. juan@correo.com"
          required
          aria-required="true"
          className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#17212B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B5D] focus:border-[#123B5D] transition-all"
        />
      </div>

      {/* Asunto */}
      <div className="space-y-1.5">
        <label
          htmlFor="contacto-asunto"
          className="block text-xs font-bold text-[#17212B] uppercase tracking-wider font-mono"
        >
          Asunto o Motivo <span className="text-[#D64545]">*</span>
        </label>
        <select
          id="contacto-asunto"
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          className="w-full h-11 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#123B5D] focus:border-[#123B5D] transition-all cursor-pointer"
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
          className="block text-xs font-bold text-[#17212B] uppercase tracking-wider font-mono"
        >
          Mensaje <span className="text-[#D64545]">*</span>
        </label>
        <textarea
          id="contacto-mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu consulta, sugerencia o detalle del error encontrado..."
          required
          aria-required="true"
          className="w-full p-3.5 rounded-xl border border-[#CBD5E1] bg-white text-sm text-[#17212B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#123B5D] focus:border-[#123B5D] transition-all resize-y"
        />
      </div>

      {/* Botón de Envío */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-[#123B5D] hover:bg-[#0E2F4B] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
        >
          <Send className="w-4 h-4 text-[#8BCF3F]" />
          <span>Enviar mensaje</span>
        </button>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-[#66727D] pt-1">
        <Mail className="w-3.5 h-3.5 text-[#123B5D] shrink-0" />
        <span>
          O si lo prefieres, escríbenos a{' '}
          <a
            href="mailto:azuladev93@gmail.com"
            className="font-bold text-[#123B5D] hover:underline"
          >
            azuladev93@gmail.com
          </a>
        </span>
      </div>
    </form>
  );
};
