import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    required = false,
    error,
    children,
    helperText,
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && (
                <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}
            {helperText && !error && (
                <p className="text-xs text-slate-500 mt-1.5">{helperText}</p>
            )}
        </div>
    );
};
