import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppDataSource } from './data-source/data-source';

const app = createExpressServer({
  controllers: [UserController],
});

const initializeDatabase = async () => {
  await AppDataSource.initialize();
}

initializeDatabase();

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});