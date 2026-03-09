'use client';

import { cn } from '@/lib/utils';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  formTextAreaClassName,
  formFieldErrorClassName,
  formLabelClassName,
  formHelperTextClassName,
  formErrorTextClassName,
} from './formStyles';

export type FormTextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
> & {
  id: string;
  name: string;
  label: string;
  helperText?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  className?: string;
};

export function FormTextArea({
  id,
  name,
  label,
  rows = 4,
  required = false,
  helperText,
  error,
  register,
  className,
  ...rest
}: FormTextAreaProps) {
  const hasError = !!error;
  const displayText = error || helperText;
  const describedBy = displayText ? `${id}-helper` : undefined;

  return (
    <div>
      <label htmlFor={id} className={formLabelClassName}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className={cn(
          formTextAreaClassName,
          hasError ? formFieldErrorClassName : 'border-transparent',
          className,
        )}
        aria-describedby={describedBy}
        aria-invalid={hasError}
        {...register}
        {...rest}
      />
      {displayText && (
        <p
          className={hasError ? formErrorTextClassName : formHelperTextClassName}
          id={`${id}-helper`}
          role={hasError ? 'alert' : undefined}
        >
          {displayText}
        </p>
      )}
    </div>
  );
}
