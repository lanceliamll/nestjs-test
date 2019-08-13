import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  //@Body means kinukuha nya yung key doon sa body, so that hindi malilito sa pag mamap si data;
  @Post()
  createTask(
    @Body("title") title: string,
    @Body("description") desciption: string
  ): Task {
    return this.taskService.createTask(title, desciption);
  }
}
