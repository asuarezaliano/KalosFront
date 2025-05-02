'use client'

import { useField } from 'formik';
import { FC, useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    name: string;
    options: Option[];
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;
}

export const Select: FC<SelectProps> = ({
    label,
    options,
    placeholder = 'Select...',
    helperText,
    disabled,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hasError = Boolean(meta.touched && meta.error);

    const selectedOption = options.find(opt => opt.value === field.value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        helpers.setValue(value);
        helpers.setTouched(true);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-600">
                    {label}
                </label>
            )}
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`
            w-full px-4 py-2
            rounded-md border text-sm
            ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}
            ${disabled ? 'cursor-not-allowed text-gray-500 bg-gray-50' : 'cursor-pointer'}
            flex items-center justify-between
            text-gray-700
            transition-all duration-200
            ${!disabled && !hasError && 'hover:border-blue-400'}
            focus:outline-none
            ${hasError
                            ? 'focus:border-red-500 focus:ring-1 focus:ring-red-200'
                            : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                        }
          `}
                >
                    <span className={!selectedOption ? 'text-gray-400' : ''}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <MdKeyboardArrowDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 
              ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </div>

                {isOpen && !disabled && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`
                  px-4 py-2 text-sm cursor-pointer
                  ${option.value === field.value
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                `}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

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