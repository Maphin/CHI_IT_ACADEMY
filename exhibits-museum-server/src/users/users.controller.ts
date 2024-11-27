import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { User } from './users.entity';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
    @ApiOperation({ summary: "Get all users" })
    @ApiQuery({ name: 'id', type: Number, required: false, description: 'The unique ID of the user' })
    @ApiQuery({ name: 'username', type: String, required: false, description: 'The username of the user' })
    @ApiResponse({ status: 200, type: [User] })
    @ApiResponse({ status: 400, description: 'Invalid query parameters or failed request.' })
    async getUserByQuery(@Query() query: GetUsersQueryDto) {
        const user = this.usersService.getUser(query);
        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }
}
