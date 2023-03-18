import { TaskStatus } from '../../tasks/task-status.enum';
import { generateUUID } from '../helper/uuid.helpers';
import { Task } from '../../tasks/task.entity';
import { mockUsers } from './fake-users.mock';

const users = mockUsers;

export const mockTasks: Task[] = [
    {
        id: generateUUID(),
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.OPEN,
        createdAt: new Date(),
        userId: users[0].id,
        user: users[0],
    },
    {
        id: generateUUID(),
        title: 'Test Task 2',
        description: 'Test Description 2',
        status: TaskStatus.IN_PROGRESS,
        createdAt: new Date(),
        userId: users[1].id,
        user: users[1],
    },
];
