import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from '../exhibits/exhibits.entity';

@Entity('users')
export class User {
    @Expose()
    @ApiProperty({ example: '1', description: 'Unique identifier for the user' })
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @ApiProperty({ example: 'john_doe', description: 'Unique username of the user', maxLength: 50 })
    @Column({ unique: true, type: 'varchar', nullable: false, length: 50 })
    username: string;

    @ApiProperty({ example: 'qwerty_password', description: 'Hashed password of the user', writeOnly: true })
    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @ApiProperty({ type: () => [Exhibit], description: 'List of exhibits created by the user' })
    @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
    exhibits: Exhibit[];
}