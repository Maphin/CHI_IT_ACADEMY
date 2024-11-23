import { Get, Post, Patch, Body, JsonController, Param, Delete, HttpError } from "routing-controllers";
import { ValidateArgs } from "../decorators/validator";
import { IUser } from "../interfaces/IUser";
import { UserDto } from "../interfaces/UserDto";
import { AppDataSource } from "../data-source/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);


@JsonController('/users')
export class UserController {
    @Get('/')
    async getAllUsers() {
        try {
            return await userRepository.find();
        } catch (err : any) {
            throw new HttpError(500, 'An error occurred while getting all users');
        }
    }

    @Post('/')
    @ValidateArgs(UserDto)
    async create(@Body() userDto: Pick<IUser, "user" | "email">) {
        try {
            const newUser = await userRepository.create(userDto);
            return await userRepository.save(newUser);
        } catch (err: any) {
            throw new HttpError(500, 'An error occurred while creating a new user');
        }
    }

    @Patch('/:id')
    @ValidateArgs(UserDto)
    async update(@Param('id') id: number, @Body() userDto: Pick<IUser, "user" | "email">) {
        try {
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                throw new HttpError(404, `User with ID ${id} not found`);
            }

            userRepository.merge(user, userDto);
            return await userRepository.save(user);
        } catch (err : any) {
            throw new HttpError(500, 'An error occurred while updating the user');
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        try {
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                throw new HttpError(404, `User with ID ${id} not found`);
            }

            await userRepository.delete(id);
            return { success: 'true' };
        } catch (error) {
            throw new HttpError(500, 'An error occurred while deleting the user');
        }
    } 
}