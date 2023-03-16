import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

// I want the service to be able to use default methods from the repository
// since EntityRepository is deprecated, fix this
@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);

        return task;
    }
}
