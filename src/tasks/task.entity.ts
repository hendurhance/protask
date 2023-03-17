import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    user: User;
}
