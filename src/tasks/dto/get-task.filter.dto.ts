import { IsOptional, Length, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @Length(3, 20)
    @IsString()
    search?: string;
}
