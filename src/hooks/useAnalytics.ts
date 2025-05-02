import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Analytics } from '../../types/transfer.types';

export const useAnalytics = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');

    useEffect(() => {
        const socketInstance = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketInstance.on('connect', () => setConnectionStatus('connected'));
        socketInstance.on('analytics', setAnalytics);
        socketInstance.on('connect_error', () => setConnectionStatus('error'));
        socketInstance.on('disconnect', () => setConnectionStatus('disconnected'));

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return {
        analytics,
        isConnected: socket?.connected ?? false,
        connectionStatus
    };
};