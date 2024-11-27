import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateExhibitDto {
    @ApiProperty({ description: 'The image file for the exhibit', type: 'string', format: 'binary' })
    readonly image: File;

    @ApiProperty({ description: 'Description of the exhibit', example: 'This is a beautiful painting from the 19th century' })
    @IsString()
    @IsNotEmpty({ message: 'Description is required and cannot be empty' })
    @MaxLength(200, { message: "Description cannot be greater than 200 characters" })
    readonly description: string;
}