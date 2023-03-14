import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    /**
     * @description Get all tasks
     * @returns {Task[]}
     */
    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
}
