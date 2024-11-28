import { axiosInstance } from ".";
import { IComment } from "../types/IComment";

export const CommentsAPI = {
    async comments(exhibitID : number): Promise<IComment[] | any> {
        const url = `/api/exhibits/${exhibitID}/comments`;
        return await axiosInstance.get(url);
    },
    async createComment(exhibitID : number, text: string) {
        const url = `/api/exhibits/${exhibitID}/comments`;
        return await axiosInstance.post(url, {text});
    },
    async deleteComment(commentID: number, exhibitID: number) {
        const url = `/api/exhibits/${exhibitID}/comments/${commentID}`;
        return await axiosInstance.delete(url);
    }
}