import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

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

    /**
     * @description Get a task by id
     * @param id {string}
     * @returns {Task}
     */
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    /**
     * @description Update a task status by id
     * @param id {string}
     * @param status {TaskStatus}
     * @returns {Task}
     */
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }

    /**
     * @description Delete a task by id
     * @param id {string}
     * @returns {void}
     */
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
