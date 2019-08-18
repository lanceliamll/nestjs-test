import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation-status.pipe';

@Controller('task') //Represents localhost:3000/task
export class TaskController {
  constructor(private taskService: TaskService) { }



  // GET by filter or without
  // localhost:5000/task?status=OPEN&search=somethinginthedescriptionortitle
  // Added :ValidationPipe: to the Query anotation to make the nest js run the validation of GetTaskFilterDTO
  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  //@Body means kinukuha nya yung key doon sa body, so that hindi malilito sa pag mamap si data;
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  //@Patch update the status of the current task
  @Patch("/:id/status")
  updateTaskStatus(@Param("id") id: string, @Body("status", TaskStatusValidationPipe) status: TaskStatus): Task {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): void {
    return this.taskService.deleteTaskById(id);
  }
}
