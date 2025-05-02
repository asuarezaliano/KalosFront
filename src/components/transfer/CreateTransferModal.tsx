'use client'

import { FC } from 'react';
import Modal from 'react-modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CreateTransferDto, Currency } from '../../../types/transfer.types';
import { FormInput } from '../common/FormInput';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

interface CreateTransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (transfer: CreateTransferDto) => Promise<void>;
}

const validationSchema = Yup.object({
    customerName: Yup.string()
        .required('Customer name is required')
        .min(3, 'Customer name must be at least 3 characters'),
    amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive'),
    currency: Yup.string()
        .required('Currency is required')
        .oneOf(Object.values(Currency), 'Invalid currency')
});

const initialValues: CreateTransferDto = {
    customerName: '',
    amount: 0,
    currency: Currency.USD
};

export const CreateTransferModal: FC<CreateTransferModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-300"
            overlayClassName="border-gray-400 rounded-lg p-4"
        >
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Transfer</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            await onSubmit(values);
                            resetForm();
                            onClose();
                        } catch (error) {
                            console.error('Error creating transfer:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <FormInput
                                label="Customer Name"
                                name="customerName"
                                type="text"
                                placeholder="Enter customer name"
                            />
                            <FormInput
                                label="Amount"
                                name="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter amount"
                            />
                            <Select
                                label="Currency"
                                name="currency"
                                options={Object.values(Currency).map(currency => ({
                                    label: currency,
                                    value: currency
                                }))}
                            />
                            <div className="flex justify-end gap-3 mt-6">
                                <Button
                                    type="button"
                                    onClick={onClose}
                                    variant="secondary"
                                    size="md"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="md"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Transfer'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
}; 