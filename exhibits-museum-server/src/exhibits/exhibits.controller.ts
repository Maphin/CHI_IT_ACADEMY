import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExhibitsService } from './exhibits.service';

@Controller('exhibits')
export class ExhibitsController {
    constructor(private readonly exhibitsService: ExhibitsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: "New exhibit creation" })
    @ApiResponse({ status: 201, description: "New exhibit created successfully" })
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
                description: { type: 'string' }
            }
        }
    })
    async createExhibit(
        @UploadedFile() file: Express.Multer.File,
        @Body() exhibitDto: CreateExhibitDto,
        @Req() req
    ) {
        console.log(req.user);
        return await this.exhibitsService.create(file, exhibitDto.description, req.user.userId); 
    }
}
