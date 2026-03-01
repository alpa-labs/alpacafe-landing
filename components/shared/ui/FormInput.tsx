'use client';

import { cn } from '@/lib/utils';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
  formInputClassName,
  formFieldErrorClassName,
  formLabelClassName,
  formHelperTextClassName,
  formErrorTextClassName,
} from './formStyles';

export type FormInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
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

export function FormInput({
  id,
  name,
  label,
  type = 'text',
  required = false,
  helperText,
  error,
  register,
  className,
  ...rest
}: FormInputProps) {
  const hasError = !!error;
  const displayText = error || helperText;
  const describedBy = displayText ? `${id}-helper` : undefined;

  return (
    <div>
      <label htmlFor={id} className={formLabelClassName}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={cn(
          formInputClassName,
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
