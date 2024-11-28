import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";


export class QueryExhibitDto {
    @ApiProperty({ description: 'Page number for pagination (starts from 1)', example: 1, required: false, minimum: 1 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Page number must be greater than or equal to 1' })
    page?: number;

    @ApiProperty({ description: 'Limit the number of items per page (max 100)', example: 10, required: false, minimum: 1, maximum: 100 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    @IsOptional()
    @Min(1, { message: 'Limit must be greater than or equal to 1' })
    @Max(100, { message: 'Limit must be less than or equal to 100' })
    limit?: number;
}