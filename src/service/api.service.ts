import axios from 'axios';
import { env } from '@/config/env';
export const api = axios.create({

    baseURL: env.NEXT_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },

});
