'use client'

import { useField } from 'formik';
import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    helperText?: string;
}

export const FormInput: FC<FormInputProps> = ({
    label,
    helperText,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);
    const hasError = Boolean(meta.touched && meta.error) || false;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        helpers.setError(undefined);
        helpers.setTouched(false);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={props.name}
                    className="text-sm font-medium text-gray-600"
                >
                    {label}
                </label>
            )}
            <input
                {...field}
                {...props}
                onChange={handleChange}
                id={props.name}
                className={`
          w-full px-4 py-2
          rounded-md border text-sm
          ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
          text-gray-700
          placeholder:text-gray-400
          transition-all duration-200
          ${props.disabled ? 'cursor-not-allowed text-gray-500 bg-gray-50' : ''}
          ${!props.disabled && 'hover:border-blue-400'}
          focus:outline-none
          ${hasError
                        ? 'focus:border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                    }
        `}
            />
            {hasError && (
                <span className="text-sm font-medium text-red-500">
                    {meta.error}
                </span>
            )}
            {helperText && !hasError && (
                <span className="text-sm text-gray-500">
                    {helperText}
                </span>
            )}
        </div>
    );
}; 