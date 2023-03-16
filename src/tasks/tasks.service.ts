import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
    ) {}

    getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find();
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
    //     createTask(createTaskDto: CreateTaskDto): Task {
    //         const { title, description } = createTaskDto;
    //         const task: Task = {
    //             id: uuid(),
    //             title,
    //             description,
    //             status: TaskStatus.OPEN,
    //         };
    //         this.tasks.push(task);

    //         return task;
    //     }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id: id });

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
    //     deleteTask(id: string): void {
    //         const task = this.getTaskById(id);
    //         this.tasks = this.tasks.filter((task) => task.id !== id);
    //     }
}
