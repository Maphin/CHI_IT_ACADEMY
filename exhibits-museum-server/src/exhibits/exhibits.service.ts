import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibit } from './exhibits.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ExhibitsService {
    constructor(
        @InjectRepository(Exhibit)
        private readonly exhibitsRepository: Repository<Exhibit>,
        // @InjectRepository(User)
        // private readonly usersRepository: Repository<User>
    ) {}

    async create(file: Express.Multer.File, description: string, userId: number) {
        const uploadPath = path.join(__dirname, '../../', 'uploads');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadPath, uniqueFileName);

        fs.writeFileSync(filePath, file.buffer);

        const exhibit = this.exhibitsRepository.create(
            {
                imageUrl: `/static/${uniqueFileName}`,
                description,
                userId
            }
        )

        return this.exhibitsRepository.save(exhibit);
    }
}
