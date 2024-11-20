import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
};

const uploadConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 5000,
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);
export const axiosUploadInstance: AxiosInstance = axios.create(uploadConfig);

const addInterceptors = (instance: AxiosInstance) => {
    // instance.interceptors.request.use(
    //     (config) => {
    //         if (typeof window !== "undefined") {
    //             const token = localStorage.getItem('token');
    //             if (token) {
    //                 config.headers['Authorization'] = `Bearer ${token}`;
    //             }
    //         }
    //         return config;
    //     },
    //     (error) => Promise.reject(error)
    // );

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
};

addInterceptors(axiosInstance);
addInterceptors(axiosUploadInstance);

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    console.log(axiosInstance.defaults.headers);
    axiosUploadInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers['Authorization'];
    delete axiosUploadInstance.defaults.headers['Authorization'];
};
