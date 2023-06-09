import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task.filter.dto';
import { Task } from './task.entity';
import { UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    /**
     * @description Get all tasks
     * @param filterTaskDto {status, search}
     * @param user {User}
     * @returns {Task[]}
     */
    @Get()
    getTasks(
        @Query() filterTaskDto: GetTaskFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        this.logger.verbose(
            `User "${
                user.username
            }" retrieving all tasks. Filters: ${JSON.stringify(filterTaskDto)}`,
        );
        return this.tasksService.getTasks(filterTaskDto, user);
    }

    /**
     * @description Create a new task
     * @param CreateTaskDto {title, description}
     * @param user {User}
     * @returns {Task}
     */
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${
                user.username
            }" creating a new task. Data: ${JSON.stringify(createTaskDto)}`,
        );
        return this.tasksService.createTask(createTaskDto, user);
    }

    /**
     * @description Get a task by id
     * @param id {string}
     * @param user {User}
     * @returns {Task}
     */
    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" retrieving task with id "${id}"`,
        );
        return this.tasksService.getTaskById(id, user);
    }

    /**
     * @description Update a task status by id
     * @param id {string}
     * @param status {TaskStatus}
     * @param user {User}
     * @returns {Task}
     */
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User,
    ): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" updating task with id "${id}" to status "${updateTaskStatusDto.status}"`,
        );
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    /**
     * @description Delete a task by id
     * @param id {string}
     * @param user {User}
     * @returns {void}
     */
    @Delete('/:id')
    async deleteTask(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<void> {
        this.logger.verbose(
            `User "${user.username}" deleting task with id "${id}"`,
        );
        await this.tasksService.deleteTask(id, user);
    }
}
