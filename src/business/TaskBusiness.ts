import { TaskDatabase } from "../database/TaskDatabase";
import { generate } from "../services/IdGenerator";
import { Task } from "../models/Task";

type SearchParams = {
  title: string;
  creator_id: string;
  status?: string;
};

export class TaskBusiness {
  constructor(private taskDatabase: TaskDatabase) {}

  public getTask = async (search: SearchParams) => {
    const parsedSeachParams = {
      title: search.title,
      creator_id: search.creator_id,
      status: search.status || undefined,
    };
    return await this.taskDatabase.findTasks(parsedSeachParams);
  };

  public getTaskById = async (id: string) => {
    const task = await this.taskDatabase.findTaskById(id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    return task;
  };

  public createTask = async (content: any) => {
    const id = generate();

    const newTask = new Task(id, content.title, false, content.creator_id);

    await this.taskDatabase.insertTask(newTask.toDBModel());

    return {
      message: "Tarefa criada com sucesso",
      task: newTask.toBusinessModel(),
    };
  };

  public updateTask = async (id: string, content: any) => {
    const task = await this.taskDatabase.findTaskById(id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    const updateTask = {
      ...task,
      ...content,
    };

    await this.taskDatabase.updateTask(updateTask);

    return { message: "Tarefa atualizada com sucesso", task };
  };

  public deleteTask = async (idToDelete: string) => {
    const task = await this.taskDatabase.findTaskById(idToDelete);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    await this.taskDatabase.deleteTask(idToDelete);

    return { message: "Tarefa excluída com sucesso" };
  };
}
