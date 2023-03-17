import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private readonly tasksRepository: TasksRepository,
    ) {}

    getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id: id });

        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        } else {
            return task;
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
}
