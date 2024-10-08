import { UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano",
    created_at: new Date().toISOString(),
  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev",
    created_at: new Date().toISOString(),
  },
];

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUsers(q: string | undefined): Promise<UserDB[]> {
    if (q) {
      return usersMock.filter((user) =>
        user.name.toLocaleLowerCase().includes(q.toLocaleLowerCase())
      );
    } else {
      return usersMock;
    }
  }

  public async findUserById(id: string): Promise<UserDB | undefined> {
    return usersMock.find((user) => user.id === id);
  }

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    return usersMock.find((user) => user.email === email);
  }

  public async insertUser(newUserDB: UserDB): Promise<void> {
    usersMock.push(newUserDB);
  }
}
