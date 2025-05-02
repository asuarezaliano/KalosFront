'use client'

import { FC, useEffect, useState } from 'react';
import { CreateTransferDto, PaginationDto, Transfer } from '../../../types/transfer.types';
import { TransferHeader } from './TransferHeader';
import { TransferList } from './TransferList';
import { getTransfers, createTransfer } from '../../../actions/transfer';
import { CreateTransferModal } from './CreateTransferModal';

export const TransferContainer: FC = () => {
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<PaginationDto>({ page: 1, limit: 10 });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadTransfers = async () => {
        try {
            setLoading(true);
            const response = await getTransfers({ ...pagination, customerName: searchTerm });
            setTransfers(response.data);
        } catch (error) {
            console.error('Error loading transfers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransfers();
    }, [pagination, searchTerm]);

    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        setPagination({ ...pagination, page: 1 });
    };

    const handleCreateTransfer = async (transfer: CreateTransferDto) => {
        try {
            await createTransfer(transfer);
            await loadTransfers();
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };

    const filteredTransfers = searchTerm
        ? transfers.filter(transfer =>
            transfer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : transfers;

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-full">
            <TransferHeader
                onSearchChange={handleSearchChange}
                onCreateClick={() => setIsModalOpen(true)}
            />
            <TransferList transfers={filteredTransfers} />
            <CreateTransferModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTransfer}
            />
        </div>
    );
};
