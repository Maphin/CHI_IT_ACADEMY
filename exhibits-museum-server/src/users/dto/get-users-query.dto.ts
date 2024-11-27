import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetUsersQueryDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString({ message: 'Username must be a valid string' })
    username?: string;
}