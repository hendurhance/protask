import { IsNotEmpty, Length } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @Length(4, 20)
    title: string;

    @IsNotEmpty()
    @Length(4, 255)
    description: string;
}
