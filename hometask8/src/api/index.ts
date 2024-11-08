import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { history } from '../navigate';

const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
};

const uploadConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 5000,
};

export const axiosInstance: AxiosInstance = axios.create(defaultConfig);
export const axiosUploadInstance: AxiosInstance = axios.create(uploadConfig);

const addInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                localStorage.removeItem('token');
                history.push('/login');
            }
            return Promise.reject(error);
        }
    );
};

addInterceptors(axiosInstance);
addInterceptors(axiosUploadInstance);

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    axiosUploadInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers['Authorization'];
    delete axiosUploadInstance.defaults.headers['Authorization'];
};
