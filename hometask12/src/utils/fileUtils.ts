import fs from 'fs';
import { User } from '../interfaces/non_decorated/User';

export const readUsersFromFile = (path: string): User[] => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log("Failed to get users from file", err);
        return [];
    }
}

export const writeUsersToFile = (path: string, users: User[]): void => {
    try {
        fs.writeFileSync(path, JSON.stringify(users, null, 2));
    } catch (err) {
        console.log("Failed to write users to file");
    }
}