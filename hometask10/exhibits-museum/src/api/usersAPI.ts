import { axiosInstance } from ".";
import { ILogin } from "../types/ILogin";

export const UsersAPI = {
    async register(data : ILogin) {
        const url = '/users/register';
        return await axiosInstance.post(url, data);
    },
    async login(data : ILogin) {
        const url = '/api/auth/login';
        return await axiosInstance.post(url, data);
    },
    async getMe() {
        const url = '/users/my-profile';
        return await axiosInstance.get(url);
    }
}