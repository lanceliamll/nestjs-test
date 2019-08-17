import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from "uuid/v1";
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];


  // GET all the task in the array
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // GET all the task with filter
  getTasksWithFilters(filterDto: GetTaskFilterDTO) {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    //Search lang ng status
    if (status) {
      tasks = tasks.filter(task => task.status === status.toUpperCase())
    }

    //If merong search input doon sa title/descripion
    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) || task.description.includes(search)
      )
    }

    return tasks;
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

  //UPDATE the status of a task
  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id); // GET first the task by id given on the parameter
    task.status = status; // SET the status to the new status
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
