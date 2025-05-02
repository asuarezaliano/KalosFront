'use server'

import { CreateTransferDto, FilterTransferDto, PaginatedResponse, Transfer } from "../types/transfer.types"
import { ServiceTransfer } from "../src/service/transfer.service"


export const createTransfer = async (createTransferDto: CreateTransferDto): Promise<Transfer> => {
    return await ServiceTransfer.createTransfer(createTransferDto)
}

export const getTransfers = async (searchTerm: FilterTransferDto): Promise<PaginatedResponse<Transfer>> => {
    return await ServiceTransfer.getTransfers(searchTerm)
} 