import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        const isAuthEndpoint =
            original.url.includes('/auth/login/') ||
            original.url.includes('/auth/refresh/') ||
            original.url.includes('/auth/verify-otp/');

        if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
            original._retry = true;
            try {
                const refresh = localStorage.getItem('refresh_token');
                if (!refresh) throw new Error('No refresh token');

                const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const cleanBaseURL = baseURL.replace(/\/+$/, '');
                const res = await axios.post(
                    `${cleanBaseURL}/auth/refresh/`,
                    { refresh }
                );
                
                localStorage.setItem('access_token', res.data.access);
                original.headers.Authorization = `Bearer ${res.data.access}`;
                return axiosInstance(original);
            } catch {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;