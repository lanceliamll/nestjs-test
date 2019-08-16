import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('task') //Represents localhost:3000/task
export class TaskController {
  constructor(private taskService: TaskService) { }


  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  //@Body means kinukuha nya yung key doon sa body, so that hindi malilito sa pag mamap si data;
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    return this.taskService.deleteTaskById(id);
  }


}
