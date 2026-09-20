'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, OctagonAlert, X } from 'lucide-react';
import { TipoAlerta } from '../../types/evaluation';
import { cn } from '../../lib/utils';

// Definición de variantes Shadcn UI con CVA
const alertVariants = cva(
  'relative w-full rounded-xl border p-4 transition-all duration-200 text-sm shadow-xs [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-8',
  {
    variants: {
      variant: {
        default:
          'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F1B2B] [&>svg]:text-[#0F1B2B]',
        info:
          'bg-[#F1F5F9] border-[#CBD5E1] text-[#334155] [&>svg]:text-[#0F1B2B]',
        success:
          'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534] [&>svg]:text-[#166534]',
        warning:
          'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E] [&>svg]:text-[#D97706]',
        destructive:
          'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B] [&>svg]:text-[#DC2626]',
        descarte:
          'bg-[#FEF2F2] border-[#DC2626] text-[#7F1D1D] [&>svg]:text-[#DC2626] ring-1 ring-[#DC2626]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Primitiva Shadcn UI Alert con atributos de accesibilidad Radix UI
const AlertPrimitive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    aria-live="polite"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
AlertPrimitive.displayName = 'AlertPrimitive';

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'font-semibold text-sm leading-tight tracking-tight text-[#0F1B2B] mb-1 flex items-center gap-2 flex-wrap',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xs sm:text-sm leading-relaxed text-[#475569]', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

// Mapeo semántico de tipos a variantes Shadcn
export interface AlertProps {
  tipo: TipoAlerta;
  titulo: string;
  mensaje: string;
  modulo?: string;
  onDismiss?: () => void;
  className?: string;
}

const TIPO_CONFIG: Record<
  TipoAlerta,
  {
    variant: 'info' | 'success' | 'warning' | 'destructive' | 'descarte';
    badgeClass: string;
    iconClass: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  info: {
    variant: 'info',
    badgeClass: 'bg-white text-[#0F1B2B] border border-[#CBD5E1]',
    iconClass: 'text-[#0F1B2B]',
    Icon: Info,
  },
  exito: {
    variant: 'success',
    badgeClass: 'bg-white text-[#166534] border border-[#BBF7D0]',
    iconClass: 'text-[#166534]',
    Icon: CheckCircle2,
  },
  advertencia: {
    variant: 'warning',
    badgeClass: 'bg-white text-[#D97706] border border-[#FDE68A]',
    iconClass: 'text-[#D97706]',
    Icon: AlertTriangle,
  },
  peligro: {
    variant: 'destructive',
    badgeClass: 'bg-white text-[#DC2626] border border-[#FECACA]',
    iconClass: 'text-[#DC2626]',
    Icon: AlertCircle,
  },
  descarte: {
    variant: 'descarte',
    badgeClass: 'bg-[#DC2626] text-white font-bold',
    iconClass: 'text-[#DC2626]',
    Icon: OctagonAlert,
  },
};

// Componente Alert de alto nivel compuesto sobre las primitivas Shadcn + Radix
export const Alert: React.FC<AlertProps> = ({
  tipo,
  titulo,
  mensaje,
  modulo,
  onDismiss,
  className,
}) => {
  const config = TIPO_CONFIG[tipo] || TIPO_CONFIG.info;
  const IconComponent = config.Icon;

  return (
    <AlertPrimitive
      variant={config.variant}
      className={cn('flex items-start gap-3 relative', className)}
    >
      <div className={cn('pt-0.5 shrink-0', config.iconClass)}>
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <AlertTitle>
          <span>{titulo}</span>
          {modulo && (
            <span
              className={cn(
                'text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold font-mono',
                config.badgeClass
              )}
            >
              {modulo}
            </span>
          )}
        </AlertTitle>
        <AlertDescription>{mensaje}</AlertDescription>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-[#475569] hover:text-[#0F1B2B] transition-colors p-1 rounded hover:bg-black/5 -mr-1 -mt-1 cursor-pointer"
          aria-label="Cerrar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </AlertPrimitive>
  );
};

export { AlertPrimitive, AlertTitle, AlertDescription, alertVariants };
