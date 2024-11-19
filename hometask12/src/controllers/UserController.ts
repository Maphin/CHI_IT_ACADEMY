import path from "path";
import { Get, Post, Patch, Body, JsonController, Param, Delete } from "routing-controllers";
import { readUsersFromFile, writeUsersToFile } from "../utils/fileUtils";
import { ValidateArgs, ValidateNoExtraFields } from "../decorators/validator";
import { User } from "../interfaces/decorated/User";
import { UserDto } from "../interfaces/decorated/UserDto";

const outputFilePath = path.join(__dirname, '../files/users_decorator.json');

@JsonController('/users')
export class UserController {
    @Get()
    getAllUsers() {
        return readUsersFromFile(outputFilePath);
    }

    @Post()
    //@ValidateArgs('User validation error')
    @ValidateNoExtraFields(UserDto)
    create(@Body() userDto: Pick<User, "user" | "email">) {
        const users = readUsersFromFile(outputFilePath);
        const newUser = { id: Date.now(), ...userDto };
        users.push(newUser);
        writeUsersToFile(outputFilePath, users);
        return newUser;
    }

    @Patch('/:id')
    //@ValidateArgs('User validation error')
    @ValidateNoExtraFields(UserDto)
    update(@Param('id') id: number, @Body() userDto: Pick<User, "user" | "email">) {
        const users = readUsersFromFile(outputFilePath);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return {message: "User not found"};
        }

        const updatedUser = { ...users[userIndex], ...userDto };
        users[userIndex] = updatedUser;
        writeUsersToFile(outputFilePath, users);

        return users[userIndex];
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        const users = readUsersFromFile(outputFilePath);
        const filteredUsers = users.filter(user => user.id !== id);

        if (filteredUsers.length === users.length) {
            return {message: "User not found"};
        }

        writeUsersToFile(outputFilePath, filteredUsers);
        return {success: true};
    }
}