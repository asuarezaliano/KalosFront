'use client'

import { FC } from 'react';
import { FormInput } from '../common/FormInput';
import { Button } from '../common/Button';
import { Formik, Form } from 'formik';

interface TransferHeaderProps {
    onCreateClick: () => void;
    onSearch: (searchTerm: string) => void;
}

export const TransferHeader: FC<TransferHeaderProps> = ({
    onCreateClick,
    onSearch,
}) => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Transfer List</h1>
            <div className="flex items-center gap-4">
                <Formik
                    initialValues={{ search: '' }}
                    onSubmit={(values) => {
                        onSearch(values.search);
                    }}
                    enableReinitialize={false}
                >
                    {({ values }) => (
                        <Form className="flex items-center gap-4">
                            <div className="w-64">
                                <FormInput
                                    name="search"
                                    placeholder="Search by customer name..."
                                    type="text"
                                    value={values.search}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                className="mr-2"
                            >
                                Search
                            </Button>
                        </Form>
                    )}
                </Formik>
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
