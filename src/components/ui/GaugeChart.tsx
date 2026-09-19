'use client';

import React from 'react';
import { Gauge } from 'lucide-react';

interface GaugeChartProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  esDescarte?: boolean;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  percentage,
  size = 200,
  strokeWidth = 14,
  label = 'Puntuación Estimada',
  esDescarte = false,
}) => {
  const safePercentage = Math.min(100, Math.max(0, percentage));
  const radius = (size - strokeWidth) / 2;
  const arcDegrees = 240;
  const startAngle = 150;
  const circumference = (2 * Math.PI * radius * arcDegrees) / 360;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  // Semantic color and status mapping
  let strokeColor = '#16A34A'; // Favorable
  let statusText = 'Estimación Favorable';
  let badgeBg = 'bg-[#F0FDF4] border-[#BBF7D0] text-[#16A34A]';

  if (esDescarte || safePercentage < 50) {
    strokeColor = '#DC2626'; // Error / Discard
    statusText = 'Criterio de Descarte';
    badgeBg = 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]';
  } else if (safePercentage < 65) {
    strokeColor = '#D97706'; // Caution / Risk
    statusText = 'Riesgo / Revisar hallazgos';
    badgeBg = 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]';
  } else if (safePercentage < 80) {
    strokeColor = '#D97706';
    statusText = 'Con Observaciones';
    badgeBg = 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]';
  }

  const center = size / 2;

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const startPoint = polarToCartesian(center, center, radius, startAngle);
  const endPoint = polarToCartesian(center, center, radius, startAngle + arcDegrees);
  const arcSweep = arcDegrees <= 180 ? '0' : '1';
  const pathD = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${arcSweep} 1 ${endPoint.x} ${endPoint.y}`;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {/* Fondo del arco en gris sutil */}
          <path
            d={pathD}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Marcas técnicas */}
          {[0, 25, 50, 65, 80, 100].map((tick) => {
            const angle = startAngle + (tick / 100) * arcDegrees;
            const pInner = polarToCartesian(center, center, radius - strokeWidth / 2 - 2, angle);
            const pOuter = polarToCartesian(center, center, radius + strokeWidth / 2 + 2, angle);
            return (
              <line
                key={tick}
                x1={pInner.x}
                y1={pInner.y}
                x2={pOuter.x}
                y2={pOuter.y}
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Arco activo coloreado */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Centro de datos */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pointer-events-none">
          <div className="flex items-center gap-1 text-[#64748B] text-[11px] font-mono uppercase tracking-wider mb-0.5">
            <Gauge className="w-3.5 h-3.5" />
            <span>{label}</span>
          </div>

          <div className="flex items-baseline gap-0.5">
            <span className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F1B2B] font-mono">
              {esDescarte ? '0' : safePercentage}
            </span>
            <span className="text-lg font-semibold text-[#64748B]">/100</span>
          </div>

          <span
            className={`mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${badgeBg}`}
          >
            {statusText}
          </span>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-[200px] text-[10px] text-[#64748B] font-mono -mt-1">
        <span>0</span>
        <span className="text-[#D97706] font-semibold">65 mín</span>
        <span>100</span>
      </div>
    </div>
  );
};
