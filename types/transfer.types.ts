export enum Currency {
    USD = 'USD',
    EUR = 'EUR'
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface Transfer {
    id: string;
    customerName: string;
    amount: number;
    currency: Currency;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTransferDto {
    customerName: string;
    amount: number;
    currency: Currency;
}

export interface Analytics {
    id: string;
    totalRevenue: number;
    transferCount: number;
    byCurrency: CurrencyAmount[];
    lastUpdated: Date;
}

export interface CurrencyAmount {
    id: string;
    currency: Currency;
    amount: number;
    analyticsId: string;
}

export interface PaginationDto {
    page: number;
    limit: number;
}

export interface FilterTransferDto extends PaginationDto {
    customerName?: string;
}