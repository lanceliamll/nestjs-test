import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from "uuid/v1";
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];


  // GET all the task in the array
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  //CREATE a task to the array, createTaskDto means the shape of the model/data
  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);
    return task;
  }

  //DELETE a task
  deleteTaskById(id: string): void {
    //#First Solution
    // let index = this.tasks.map(task => task.id).indexOf(id);
    // this.tasks.splice(index, 1);
    // return this.tasks;

    //#Second Solution
    // let index = this.tasks.filter(task => task.id != id);
    // return index;

    //#Third Solution
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
