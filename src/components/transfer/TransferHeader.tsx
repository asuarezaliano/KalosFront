'use client'

import { FC } from 'react';
import { FormInput } from '../common/FormInput';
import { Button } from '../common/Button';
import { Formik } from 'formik';

interface TransferHeaderProps {
    onSearchChange: (search: string) => void;
    onCreateClick: () => void;
}

export const TransferHeader: FC<TransferHeaderProps> = ({
    onSearchChange,
    onCreateClick,
}) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Transfer List</h1>
            <div className="flex items-center gap-4">
                <div className="w-64">
                    <Formik
                        initialValues={{ search: '' }}
                        onSubmit={() => { }}
                    >
                        {({ values, setFieldValue }) => (
                            <FormInput
                                name="search"
                                placeholder="Search by customer name..."
                                type="text"
                                onChange={(e) => {
                                    setFieldValue('search', e.target.value);
                                    onSearchChange(e.target.value);
                                }}
                            />
                        )}
                    </Formik>
                </div>
                <Button
                    onClick={onCreateClick}
                    variant="primary"
                    size="md"
                >
                    New Transfer
                </Button>
            </div>
        </div>
    );
};
