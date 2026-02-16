// Configuration for API and uploads
// Uses environment variables with fallbacks for development

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Uploads Base URL (derived from API URL)
export const UPLOADS_BASE_URL = API_BASE_URL.replace('/api', '/uploads');

// Helper function to get full upload URL
export const getUploadUrl = (filename) => {
    if (!filename) return '';
    return `${UPLOADS_BASE_URL}/${filename}`;
};
