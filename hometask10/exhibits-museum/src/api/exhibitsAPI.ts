import { axiosInstance, axiosUploadInstance } from ".";
import { IExhibit } from "../types/IExhibit";

const exhibits_BASE_URL = '/api/exhibits';

export const ExhibitsAPI = {
    async exhibits(page: number, limit?: number): Promise<IExhibit[] | any> {
        const url = exhibits_BASE_URL;
        //const exhibits = await fetch(`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits?page=${page}&limit=${limit}`);
        //return exhibits.json();
        // console.log(await exhibits.json());
        const response = await axiosInstance.get(url, {
            params: { page, limit }
        });
        return response.data; 
    },
    async myExhibits(page: number, limit?: number): Promise<IExhibit[] | any> {
        const url = `${exhibits_BASE_URL}/my-posts`;
        const response = await axiosInstance.get(url, {
            params: { page, limit }
        });
        return response.data;
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