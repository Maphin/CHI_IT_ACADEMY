import { IsEmail, IsString } from "../../decorators/validator";

export class User {
    id!: number;

    @IsString()
    user!: string;

    @IsEmail()
    email!: string;
}