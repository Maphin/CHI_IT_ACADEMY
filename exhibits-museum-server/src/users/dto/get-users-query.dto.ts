import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetUsersQueryDto {
    @ApiProperty({ example: 1, description: 'Unique identifier for the user' })
    @Type(() => Number)
    @IsOptional()
    @IsInt({ message: 'ID must be an integer' })
    id?: number;

    @ApiProperty({ example: 'john_doe', description: 'Unique username of the user' })
    @IsOptional()
    @IsString({ message: 'Username must be a valid string' })
    username?: string;
}