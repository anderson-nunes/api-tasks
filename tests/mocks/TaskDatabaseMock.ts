import { TaskDB } from "../../src/models/Task";

export const tasksMock: TaskDB[] = [
  {
    id: "task-1",
    title: "Tarefa atualizada", // Esta tarefa será atualizada
    status: false,
    creator_id: "id-mock-astrodev",
    created_at: new Date().toISOString(),
  },
  {
    id: "task-2",
    title: "Segunda tarefa", // Esta é a segunda tarefa
    status: true,
    creator_id: "id-mock-fulano",
    created_at: new Date().toISOString(),
  },
];

export class TaskDatabaseMock {
  public async findTasks(search: any): Promise<TaskDB[]> {
    let tasks = tasksMock;

    if (search.title) {
      tasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.title.toLowerCase())
      );
    }

    if (search.creator_id) {
      tasks = tasks.filter((task) => task.creator_id === search.creator_id);
    }

    if (search.status !== undefined) {
      tasks = tasks.filter((task) => task.status === search.status);
    }

    return tasks;
  }

  public async findTaskById(id: string): Promise<TaskDB | undefined> {
    return tasksMock.find((task) => task.id === id);
  }

  public async insertTask(newTask: TaskDB): Promise<void> {
    tasksMock.push(newTask);
  }

  public async updateTask(updatedTask: TaskDB): Promise<void> {
    const index = tasksMock.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasksMock[index] = {
        ...tasksMock[index],
        ...updatedTask,
      };
    }
  }

  public async deleteTask(id: string): Promise<void> {
    const index = tasksMock.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasksMock.splice(index, 1);
    }
  }
}
