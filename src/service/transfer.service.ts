import { FilterTransferDto, PaginatedResponse, Transfer } from '../../types/transfer.types'
import { CreateTransferDto } from '../../types/transfer.types'
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

    getTransfers: async (filterTransferDto: FilterTransferDto): Promise<PaginatedResponse<Transfer>> => {
        try {
            const { page, limit, customerName } = filterTransferDto
            const params = {
                page,
                limit,
                ...(customerName && customerName !== '' && { customerName })
            }
            const response = await api.get('/transfer', { params })
            return response.data
        } catch (error) {
            throw new Error('Error getting transfers')
        }
    }
}