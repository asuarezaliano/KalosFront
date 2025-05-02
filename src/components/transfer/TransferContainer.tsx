'use client'

import { FC, useEffect, useState } from 'react';
import { CreateTransferDto, PaginationDto, PaginatedResponse, Transfer } from '../../../types/transfer.types';
import { TransferHeader } from './TransferHeader';
import { TransferList } from './TransferList';
import { getTransfers, createTransfer } from '../../../actions/transfer';
import { CreateTransferModal } from './CreateTransferModal';
import Pagination from '../common/pagination';

export const TransferContainer: FC<{ transfersFetched: PaginatedResponse<Transfer> }> = ({ transfersFetched }) => {
    const [transfers, setTransfers] = useState<Transfer[]>(transfersFetched.data);
    const [pagination, setPagination] = useState<PaginationDto>({ page: 1, limit: 10 });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadTransfers();
    }, [pagination]);

    const loadTransfers = async (search?: string) => {
        try {
            const response = await getTransfers({
                ...pagination,
                customerName: search !== undefined ? search : searchTerm
            });
            setTransfers(response.data);
        } catch (error) {
            console.error('Error loading transfers:', error);
        }
    };

    const handleSearch = async (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setPagination({ ...pagination, page: 1 });
        await loadTransfers(searchTerm);
    };

    const handleCreateTransfer = async (transfer: CreateTransferDto) => {
        try {
            await createTransfer(transfer);
            await loadTransfers();
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };

    const handlePageChange = async (page: number, limit: number) => {
        setPagination({ page, limit });
    };

    return (
        <div className="flex flex-col h-full">
            <TransferHeader
                onCreateClick={() => setIsModalOpen(true)}
                onSearch={handleSearch}
            />
            <TransferList transfers={transfers} />
            <CreateTransferModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTransfer}
            />
            <Pagination
                page={pagination.page}
                total={transfersFetched.meta.total}
                limit={pagination.limit}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
