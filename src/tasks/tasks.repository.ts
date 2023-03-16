import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

// I want the service to be able to use default methods from the repository
// since EntityRepository is deprecated, fix this
@Injectable()
export class TaskRepository extends Repository<Task> {
    
}
