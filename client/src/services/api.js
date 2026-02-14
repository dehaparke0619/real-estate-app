import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const fetchProperties = () => api.get('/properties');
export const fetchProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (formData) => api.post('/properties', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default api;
