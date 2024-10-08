import { Request, Response } from "express";
import { TaskBusiness } from "../business/TaskBusiness";

type SearchParams = {
  title: string;
  creator_id: string;
  status: string;
};

export class TaskController {
  constructor(private taskBusiness: TaskBusiness) {}

  public getTasks = async (req: Request, res: Response) => {
    try {
      const search: SearchParams = {
        title: req.query.title as string,
        creator_id: req.query.creator_id as string,
        status: req.query.status as string,
      };
      const response = await this.taskBusiness.getTask(search);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send("Erro inesperado");
    }
  };

  public getTaskById = async (req: Request, res: Response) => {
    try {
      const input: any = {
        id: req.params.id,
      };

      const response = await this.taskBusiness.getTaskById(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send("Erro inesperado");
    }
  };

  public createTask = async (req: Request, res: Response) => {
    try {
      const input = {
        title: req.body.title,
        status: req.body.status,
        creator_id: req.body.creator_id,
      };

      const response = await this.taskBusiness.createTask(input);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro inesperado");
    }
  };

  public updateTask = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const payload = req.body;

      const response = await this.taskBusiness.updateTask(id, payload);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro inesperado");
    }
  };

  public deleteTask = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id;

      const response = await this.taskBusiness.deleteTask(idToDelete);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send("Erro inesperado");
    }
  };
}
