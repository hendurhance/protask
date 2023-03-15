import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    /**
     * @description Get all tasks
     * @returns {Task[]}
     */
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    /**
     * @description Create a new task
     * @param CreateTaskDto {title, description}
     * @returns {Task}
     */
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }
}
