import { CreateTransferDto, PaginatedResponse, Transfer } from '../../../types/transfer.types'
import { api } from './api.service'

export const ServiceTransfer = {
    createTransfer: async (createTransferDto: CreateTransferDto): Promise<Transfer> => {
        try {
            const response = await api.post('/transfer', createTransferDto)
            return response.data
        } catch (error) {
            throw new Error('Error creating transfer')
        }
    },

    getTransfers: async (): Promise<PaginatedResponse<Transfer>> => {
        try {
            const response = await api.get('/transfer')
            return response.data
        } catch (error) {
            throw new Error('Error getting transfers')
        }
    }
}