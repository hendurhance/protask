import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { mockUsers } from '../common/mock/fake-users.mock';
import { mockTasks } from '../common/mock/fake-tasks.mock';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
});

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        tasksRepository = await module.get<TasksRepository>(TasksRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            tasksRepository.getTasks.mockResolvedValue('getTasks');
            const result = await tasksService.getTasks(null, mockUsers[0]);
            expect(result).toEqual('getTasks');
        });
    });

    describe('getTaskById', () => {
        it('calls tasksRepository.findOne() and successfully retrieve and return the task', async () => {
            const mockTask = mockTasks[0];
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('1', mockUsers[0]);
            expect(result).toEqual(mockTask);
            expect(tasksRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: '1',
                    userId: mockUsers[0].id,
                },
            });
        });

        it('throws an error as task is not found', () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(
                tasksService.getTaskById('1', mockUsers[0]),
            ).rejects.toThrow();
        });
    });

    describe('createTask', () => {
        it('calls tasksRepository.createTask() and returns the result', async () => {
            tasksRepository.createTask.mockResolvedValue('createTask');
            expect(
                tasksService.createTask(
                    {
                        title: 'Test Task',
                        description: 'Test Description',
                    },
                    mockUsers[0],
                ),
            ).resolves.toEqual('createTask');
        });
    });
});
