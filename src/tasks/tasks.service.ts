import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private readonly tasksRepository: TasksRepository,
    ) {}

    getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }
    //     getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //         const { status, search } = filterDto;

    //         let tasks = this.getAllTasks();

    //         if (status) {
    //             tasks = tasks.filter((task) => task.status === status);
    //         }

    //         if (search) {
    //             tasks = tasks.filter(
    //                 (task) =>
    //                     task.title.includes(search) ||
    //                     task.description.includes(search),
    //             );
    //         }

    //         return tasks;
    //     }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOneBy({ id: id });

        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        } else {
            return task;
        }
    }

    //     updateTaskStatus(id: string, status: TaskStatus): Task {
    //         const task = this.getTaskById(id);
    //         task.status = status;
    //         return task;
    //     }

    async deleteTask(id: string): Promise<void> {
        const task = await this.getTaskById(id);
        await this.tasksRepository.delete(task.id);
    }
}
