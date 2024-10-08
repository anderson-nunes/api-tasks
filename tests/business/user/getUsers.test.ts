import { UserBusiness } from "../../../src/business/UserBusiness";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(new UserDatabaseMock());

  test("deve gerar token ao logar", async () => {
    const input = {
      email: "fulano@email.com",
      password: "fulano123",
    };

    const output = await userBusiness.login(input);
    console.log(output);

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      id: "id-mock-fulano",
      name: "Fulano",
      email: "fulano@email.com",
      token: expect.any(String),
    });
  });

  test("deve retornar erro se email não for encontrado", async () => {
    expect.assertions(1);
    try {
      const input = {
        email: "email-nao-existente@email.com",
        password: "fulano123",
      };

      await userBusiness.login(input);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  test("deve retornar erro se a senha estiver incorreta", async () => {
    expect.assertions(2);
    try {
      const input = {
        email: "fulano@email.com",
        password: "senha-incorreta",
      };

      await userBusiness.login(input);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toBe("'email' ou 'password' incorretos");
      }
    }
  });
});

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(new UserDatabaseMock());

  test("deve gerar token ao cadastrar", async () => {
    const input = {
      name: "Novo Usuário",
      email: "novo@usuario.com",
      password: "senha123",
    };

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: expect.any(String),
    });
  });
});
