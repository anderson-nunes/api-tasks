import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input: any = {
        nameToSearch: req.query.name as string | undefined,
      };

      const response = await this.userBusiness.getUsers(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      res.status(500).send("Erro inesperado");
    }
  };

  public signup = async (req: Request, res: Response) => {
    try {
      const input = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro inesperado");
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = {
        email: req.body.email,
        password: req.body.password,
      };

      const output = await this.userBusiness.login(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro inesperado");
    }
  };
}
