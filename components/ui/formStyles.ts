// Shared form styles - now using CSS classes from globals.css for consistency
// This file provides a centralized reference point for form-related class names

export const formFieldBaseClassName = 'form-field-base';
export const formFieldErrorClassName = 'form-field-error';
export const formLabelClassName = 'form-label';
export const formHelperTextClassName = 'form-helper-text';
export const formErrorTextClassName = 'form-error-text';

// Additional Tailwind classes for specific form field types
export const formInputClassName = formFieldBaseClassName;
export const formTextAreaClassName = `${formFieldBaseClassName} block min-h-0 resize-y align-top`;
