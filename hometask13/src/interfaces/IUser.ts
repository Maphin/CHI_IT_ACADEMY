import { IsEmail, IsString } from "../decorators/validator";

export class IUser {
    id!: number;

    @IsString()
    user!: string;

    @IsEmail()
    email!: string;
}