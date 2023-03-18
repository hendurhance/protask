import { generateUUID } from '../helper/uuid.helpers';
import { User } from '../../auth/user.entity';

export const mockUsers: User[] = [
    {
        id: generateUUID(),
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password',
        tasks: [],
        createdAt: new Date(),
    },
    {
        id: generateUUID(),
        name: 'John Doe',
        username: 'johndoe',
        email: 'janedoe@example.com',
        password: 'password',
        tasks: [],
        createdAt: new Date(),
    },
];
