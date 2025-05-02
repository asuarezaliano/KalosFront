'use client'

import { FC } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export const HomeContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { analytics, isConnected } = useAnalytics();

    const calculateCurrencyPercentage = (currency: 'USD' | 'EUR'): number => {
        if (!analytics?.byCurrency) return 0;
        const total = analytics.byCurrency.reduce((sum, curr) => sum + curr.amount, 0);
        const currencyAmount = analytics.byCurrency.find(c => c.currency === currency)?.amount || 0;
        return total > 0 ? Math.round((currencyAmount / total) * 100) : 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    <span className="text-blue-600">Kalos</span> Manager
                    {!isConnected && (
                        <span className="ml-3 text-sm text-red-500">(Offline)</span>
                    )}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>

                            <div className="bg-blue-50 rounded-lg p-4">
                                <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
                                <p className="text-2xl font-bold text-blue-900">
                                    ${analytics?.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                </p>
                                <p className="text-sm text-blue-600 mt-1">Last updated: {analytics?.lastUpdated ? new Date(analytics.lastUpdated).toLocaleString() : 'Never'}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                                    <p className="text-sm text-gray-700 font-medium">Total Transfers</p>
                                    <p className="text-xl font-bold text-gray-900">{analytics?.transferCount.toLocaleString() || '0'}</p>
                                </div>
                                <div className="bg-gray-200 rounded-lg p-4 border border-gray-300">
                                    <p className="text-sm text-gray-700 font-medium">Average Transfer</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        ${analytics && analytics.transferCount > 0
                                            ? (analytics.totalRevenue / analytics.transferCount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                            : '0.00'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Currency Distribution</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">USD</span>
                                        <span className="text-sm font-medium text-gray-900">{calculateCurrencyPercentage('USD')}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">EUR</span>
                                        <span className="text-sm font-medium text-gray-900">{calculateCurrencyPercentage('EUR')}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-lg shadow-md">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
