import React, { useEffect } from 'react';
import { Select } from './Select';
import { Formik, Form } from 'formik';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
    total: number;
    limit: number;
    page: number;
    onPageChange: (page: number, limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    total,
    limit,
    onPageChange,
}) => {
    const totalPages = Math.ceil(total / limit);
    const itemsPerPageOptions = [5, 10, 20, 50, 100].map((option) => ({
        value: option.toString(),
        label: option.toString(),
    }));

    const handlePageChange = (page: number, limit: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page, limit);
        }
    };

    return (
        <div className="flex items-center justify-between p-3 sm:p-6 bg-white border-t border-gray-200">
            <div className="flex items-center justify-center flex-1">
                <nav aria-label="Pagination" className="relative inline-flex rounded-md shadow-sm">
                    <button
                        type="button"
                        onClick={() => handlePageChange(page - 1, limit)}
                        disabled={page === 1}
                        className={`relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 min-w-[40px] ${page === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed rounded-l-md'
                            : 'bg-white text-gray-500 cursor-pointer hover:bg-gray-50 rounded-l-md'
                            }`}
                    >
                        <FaChevronLeft />
                    </button>
                    <div className="flex items-center px-4 bg-white border-y border-gray-300 text-sm text-gray-700">
                        Page {page} of {totalPages}
                    </div>
                    <button
                        type="button"
                        onClick={() => handlePageChange(page + 1, limit)}
                        disabled={page === totalPages}
                        className={`relative inline-flex items-center justify-center px-3 py-2 text-sm font-medium border border-gray-300 min-w-[40px] ${page === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed rounded-r-md'
                            : 'bg-white text-gray-500 cursor-pointer hover:bg-gray-50 rounded-r-md'
                            }`}
                    >
                        <FaChevronRight />
                    </button>
                </nav>
            </div>
            <div className="flex items-center ml-4">
                <span className="mr-2 text-sm text-gray-700">Show:</span>
                <Formik
                    initialValues={{ itemsPerPage: limit.toString() }}
                    onSubmit={() => { }}
                >
                    {({ values, setFieldValue }) => {
                        useEffect(() => {
                            if (values.itemsPerPage && values.itemsPerPage !== limit.toString()) {
                                handlePageChange(page, Number(values.itemsPerPage));
                            }
                        }, [values.itemsPerPage]);
                        return (
                            <Form>
                                <Select
                                    name="itemsPerPage"
                                    options={itemsPerPageOptions}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Pagination;
