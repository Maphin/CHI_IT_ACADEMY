import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({ description: 'Text of the comment', type: 'string', example: 'Comment example' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(500, { message: "Comment cannot be greater than 500 characters" })
    text: string;
}