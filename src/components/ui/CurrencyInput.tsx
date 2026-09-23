'use client';

import React from 'react';

interface CurrencyInputProps {
  id?: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  helperText,
  error,
  disabled = false,
}) => {
  const formatNumber = (num: number): string => {
    if (!num && num !== 0) return '';
    return num.toLocaleString('es-CO');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numValue = rawValue ? parseInt(rawValue, 10) : 0;
    onChange(numValue);
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <span className="text-[#64748B] font-semibold text-sm">$</span>
        </div>
        <input
          type="text"
          id={id}
          value={value === undefined || value === null ? '' : formatNumber(value)}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`block w-full h-12 rounded-lg bg-white border pl-8 pr-16 text-sm sm:text-base text-[#0F1B2B] font-mono tracking-tight placeholder:text-[#475569] focus:outline-none focus:ring-1 transition-all ${
            error
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]'
              : 'border-[#CBD5E1] focus:border-[#0F1B2B] focus:ring-[#0F1B2B]'
          } ${disabled ? 'opacity-60 cursor-not-allowed bg-[#F1F5F9]' : ''}`}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
          <span className="text-[#64748B] text-xs uppercase tracking-wider font-mono font-semibold">
            COP
          </span>
        </div>
      </div>
      {error && <p className="text-xs text-[#DC2626] font-medium">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-[#64748B]">{helperText}</p>
      )}
    </div>
  );
};
