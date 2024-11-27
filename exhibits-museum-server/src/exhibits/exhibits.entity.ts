import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';

@Entity('exhibits')
export class Exhibit {
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique identifier for the exhibit' })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ApiProperty({ example: 'https://example.com/images/exhibit.jpg', description: 'URL of the exhibit image' })
    @Column({ type: 'varchar', nullable: false })
    imageUrl: string;

    @ApiProperty({ example: 'A beautiful painting from the 19th century', description: 'Description of the exhibit' })
    @Column({ type: 'text', nullable: false })
    description: string;
  
    @ApiProperty({ type: () => User, description: 'User who created the exhibit' })
    @ManyToOne(() => User, (user) => user.exhibits, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;
  
    @ApiProperty({ example: 5, description: 'Number of comments on the exhibit' })
    @Column({ type: 'int', default: 0 })
    commentCount: number;
  
    @ApiProperty({ example: '2023-11-26T13:23:45Z', description: 'Creation timestamp of the exhibit', })
    @CreateDateColumn()
    createdAt: string;
}