import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchProperties = () => api.get('/properties');
export const fetchProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (formData) => api.post('/properties', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default api;
