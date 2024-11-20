import { IUser } from "./IUser"

export interface IExhibit {
    id: number
    imageUrl: string
    description: string
    user: IUser
    commentCount: number
    createdAt: string
}