import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  //@Body means kinukuha nya yung key doon sa body, so that hindi malilito sa pag mamap si data;
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
