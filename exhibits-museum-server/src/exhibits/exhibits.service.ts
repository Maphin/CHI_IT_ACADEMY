import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibit } from './exhibits.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import * as path from 'path';
import { FileService } from 'src/file/file.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ExhibitsService {
    constructor(
        @InjectRepository(Exhibit)
        private readonly exhibitsRepository: Repository<Exhibit>,
        private readonly fileService: FileService,
        private readonly notificationService: NotificationsGateway
    ) {}

    async create(file: Express.Multer.File, description: string, user: User): Promise<Exhibit> {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        this.fileService.validateFile(file);

        const imageUrl = await this.uploadFile(file);
        const exhibit = this.exhibitsRepository.create(
            {
                imageUrl,
                description,
                userId: user.id
            }
        );
        this.sendNewPostNotification(description, user.username);

        return this.exhibitsRepository.save(exhibit);
    }

    async getAll(page: number, limit: number): Promise<{ data: Exhibit[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;
        const [exhibits, total] = await this.exhibitsRepository.findAndCount({ skip, take: limit });
        return this.paginate(exhibits, total, page, limit);
    }

    async getMy(userId : number, page : number, limit : number): Promise<{ data: Exhibit[]; total: number; page: number; lastPage: number }> {
        const skip = (page - 1) * limit;
        const [userExhibits, total] = await this.exhibitsRepository.findAndCount({ skip, take: limit, where: { userId } });
        return this.paginate(userExhibits, total, page, limit);
    }
    
    async getOne(id: number): Promise<Exhibit> {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id } });
        if (!exhibit) {
            throw new HttpException(`Exhibit with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return exhibit;
    }

    async remove(id: number, user: User): Promise<void> {
        const exhibit = await this.getOne(id);

        if (user?.isAdmin || exhibit.userId === user.id) {
            await this.exhibitsRepository.remove(exhibit);
            this.fileService.removeFile(exhibit.imageUrl);
        } else {
            throw new HttpException("You do not have a permission to delete this exhibit", HttpStatus.FORBIDDEN);
        }
    }

    async incrementCommentsCount(id: number) {
        const exhibit = await this.getOne(id);
        exhibit.commentCount++;
        return await this.exhibitsRepository.save(exhibit);
    }
    async decrementCommentsCount(id: number) {
        const exhibit = await this.getOne(id);
        exhibit.commentCount--;
        return await this.exhibitsRepository.save(exhibit);
    }
    private async uploadFile(file: Express.Multer.File): Promise<string> {
        const uploadPath = path.join(__dirname, '../../', 'uploads');
        const uniqueFileName = this.fileService.saveFile(file, uploadPath);
        return `/static/${uniqueFileName}`;
    }
    private paginate(data: Exhibit[], total: number, page: number, limit: number) {
        return {
            data,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        }
    }
    private sendNewPostNotification(message: string, user: string) {
        this.notificationService.handleNewPost({ message, user });
    }
}
