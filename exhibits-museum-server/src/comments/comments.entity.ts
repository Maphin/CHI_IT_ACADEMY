import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Exhibit } from '../exhibits/exhibits.entity';

@Entity('comments')
export class Comment {
    @Expose()
    @ApiProperty({ example: 1, description: 'Unique identifier for the comment' })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ApiProperty({ example: 'comment example', description: 'Text of the comment' })
    @Column({ type: 'varchar', nullable: false })
    text: string;

    @ApiProperty({ type: () => Exhibit, description: 'Exhibit of the comment' })
    @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibitId' })
    exhibit: Exhibit

    // @Column()
    // exhibitId: number;

    @Expose()
    @ApiProperty({ type: () => User, description: 'User who created a comment' })
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE', eager: true })
    user: User

    // @Column()
    // userId: number;

    @Expose()
    @ApiProperty({ example: '2023-11-26T13:23:45Z', description: 'Creation timestamp of the comment', })
    @CreateDateColumn()
    createdAt: string;
}