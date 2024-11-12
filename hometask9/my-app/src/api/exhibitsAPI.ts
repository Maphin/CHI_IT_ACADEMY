import { axiosInstance, axiosUploadInstance } from ".";
import { IExhibit } from "../types/IExhibit";

const exhibits_BASE_URL = '/api/exhibits';

export const ExhibitsAPI = {
    async exhibits(page: number, limit?: number): Promise<IExhibit[] | any> {
        const url = exhibits_BASE_URL;
        return await axiosInstance.get(url, {
            params: { page, limit }
        });
    },
    async myExhibits(page: number, limit?: number): Promise<IExhibit[] | any> {
        const url = `${exhibits_BASE_URL}/my-posts`;
        return await axiosInstance.get(url, {
            params: { page, limit }
        });
    },
    async createExhibit(exhibitData: FormData): Promise<IExhibit | any> {
        const url = exhibits_BASE_URL;
        return await axiosUploadInstance.post(url, exhibitData);
    },
    async deleteExhibit(id: number) {
        const url = `${exhibits_BASE_URL}/${id}`;
        return await axiosInstance.delete(url);
    }
}