import { IUser } from "./IUser"

export interface IComment {
    id: number
    text: string
    createdAt: string
    user: IUser
}