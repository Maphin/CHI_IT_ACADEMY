import { IsEmail, IsString } from "../decorators/validator";

export class UserDto {
    @IsString()
    user!: string;

    @IsEmail()
    email!: string;
}