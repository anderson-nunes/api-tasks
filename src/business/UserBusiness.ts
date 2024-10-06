import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { compareHash, generateHash } from "../services/HashManager";
import { generate } from "../services/IdGenerator";
import { createToken } from "../services/TokenManager";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}

  public getUsers = async (input: any): Promise<any> => {
    const { nameToSearch } = input;

    const usersDB = await this.userDatabase.findUsers(nameToSearch);

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.created_at
      );

      return user.toBusinessModel();
    });

    return users;
  };

  public signup = async (input: any): Promise<any> => {
    const { name, email, password } = input;

    const id = generate();

    const userDBExists = await this.userDatabase.findUserById(id);

    if (userDBExists) {
      throw new Error("usuário existente");
    }

    const hashedPassword = await generateHash(password);

    const newUser = new User(id, name, email, hashedPassword);

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.insertUser(newUserDB);

    const payload = {
      id: newUser.getId(),
      name: newUser.getName(),
    };

    const token = createToken(payload);

    const response = {
      message: "Cadastro realizado com sucesso",
      token,
    };

    return response;
  };

  public login = async (input: any): Promise<any> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new Error("'dados' não encontrado");
    }
    // o password hasheado está no banco de dados
    const hashedPassword = userDB.password;

    // o serviço hashManager analisa o password do body (plaintext) e o hash
    const isPasswordCorrect = await compareHash(password, hashedPassword);

    // validamos o resultado
    if (!isPasswordCorrect) {
      throw new Error("'email' ou 'password' incorretos");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password
    );

    const payload = {
      id: user.getId(),
      name: user.getName(),
    };

    const token = createToken(payload);

    const response = {
      message: "Login realizado com sucesso",
      id: userDB.id,
      name: userDB.name,
      email: userDB.email,
      token,
    };

    return response;
  };
}
