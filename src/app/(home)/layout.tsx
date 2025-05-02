'use client'

import { FC, ReactNode } from 'react';
import { HomeContainer } from '@/components/home/HomeContainer';

interface LayoutProps {
    children: ReactNode;
}

const HomeLayout: FC<LayoutProps> = ({ children }) => {

    return (
        <div className="min-h-screen bg-gray-50">
            <HomeContainer>
                <main className="py-6">
                    {children}
                </main>
            </HomeContainer>
        </div>
    );
};

export default HomeLayout;
