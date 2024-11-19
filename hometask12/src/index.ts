import express, { Express, Request, Response } from 'express';
import path from 'path';
import { User } from './interfaces/non_decorated/User';
import { readUsersFromFile, writeUsersToFile } from './utils/fileUtils';

const app: Express = express();
const PORT = 3000;

app.use(express.json());
const outputFilePath = path.join(__dirname, '/files/users.json');

app.get('/', (req : Request, res: Response) => {
    const authorData = {author: "David Pozhar"};
    res.json(authorData);
});

app.get('/users', (req : Request, res: Response) => {
    const users = readUsersFromFile(outputFilePath);
    res.status(200).json(users);
});

app.post('/users', (req : Request<{}, {}, Pick<User, "user" | "email">>, res: Response) => {
    const { user, email} = req.body;

    if (!user || !email) {
        res.status(400).json({error: 'User and email are required'});
        return;
    }

    const users = readUsersFromFile(outputFilePath);
    const newUser: User = {id: Date.now(), user: user, email};
    users.push(newUser);

    writeUsersToFile(outputFilePath, users);
    res.status(201).json(newUser);
});

app.delete('/users/:id', (req : Request<{id: string}>, res: Response) => {
    const { id } = req.params;

    const users = readUsersFromFile(outputFilePath);
    const filteredUsers = users.filter(user => user.id !== parseInt(id));

    if (filteredUsers.length === users.length) {
        res.status(404).json({error: "User not found"});
        return;
    }

    writeUsersToFile(outputFilePath, filteredUsers);
    res.status(200).json({success: true});
});

app.patch('/users/:id', (req : Request<{id: string}, {}, Pick<User, "user" | "email">>, res: Response) => {
    const { id } = req.params;
    const { user, email } = req.body;

    const users = readUsersFromFile(outputFilePath);
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        res.status(404).json({error: "User not found"});
        return;
    }

    if (user) users[userIndex].user = user;
    if (email) users[userIndex].email = email;

    writeUsersToFile(outputFilePath, users);
    res.status(200).json(users[userIndex]);
});

// app.listen(PORT, () => {
//     console.log("Server is running on port: ", PORT);
// })