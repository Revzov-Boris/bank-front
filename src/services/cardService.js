import { apiService } from './api';
import { ENDPOINTS } from '../config/api';

export const cardService = {
    getUserProfile: async () => {
        try {
            const data = await apiService.get(ENDPOINTS.PROFILE);
            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },

    getUserCards: async (page = 0, size = 10) => {
        try {
            const params = { page, size };
            const data = await apiService.get(ENDPOINTS.MY_CARDS, params);
            return data;
        } catch (error) {
            console.error('Error fetching user cards:', error);
            throw error;
        }
    },

    createTransfer: async (transferData) => {
        try {
            const data = await apiService.post('/api/transfers', transferData);
            return data;
        } catch (error) {
            console.error('Error creating transfer:', error);
            throw error;
        }
    },
};