import { UserBusiness } from "../../../src/business/UserBusiness";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(new UserDatabaseMock());

  test("deve gerar token ao cadastrar", async () => {
    const input = {
      name: "Ciclana",
      email: "ciclana@email.com",
      password: "Ciclana@321",
    };

    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      message: "Cadastro realizado com sucesso",
      token: expect.any(String), // Aceita qualquer string como token
    });
  });
});
