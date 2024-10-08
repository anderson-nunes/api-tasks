import { TaskBusiness } from "../../../src/business/TaskBusiness";
import { TaskDatabaseMock } from "../../mocks/TaskDatabaseMock";

describe("Testando TaskBusiness", () => {
  const taskBusiness = new TaskBusiness(new TaskDatabaseMock());

  test("deve retornar lista de todas as tasks", async () => {
    const input = {
      title: "",
      creator_id: "id-mock-astrodev",
      status: undefined,
    };

    const output = await taskBusiness.getTask(input);

    expect(output).toHaveLength(1);
    expect(output[0].title).toBe("Tarefa atualizada");
  });

  test("deve criar uma nova task", async () => {
    const input = {
      title: "Nova tarefa",
      creator_id: "id-mock-fulano",
    };

    const output = await taskBusiness.createTask(input);

    expect(output.message).toBe("Tarefa criada com sucesso");
    expect(output.task.title).toBe("Nova tarefa");
  });

  test("deve atualizar uma task existente", async () => {
    const id = "task-1";
    const input = {
      title: "Tarefa atualizada",
      status: true,
    };

    const output = await taskBusiness.updateTask(id, input);

    expect(output.message).toBe("Tarefa atualizada com sucesso");
    expect(output.task.title).toBe("Tarefa atualizada");
    expect(output.task.status).toBe(true);
  });

  test("deve deletar uma task existente", async () => {
    const id = "task-2";

    const output = await taskBusiness.deleteTask(id);

    expect(output.message).toBe("Tarefa excluída com sucesso");

    const tasks = await taskBusiness.getTask({ title: "", creator_id: "" });
    expect(tasks.find((task) => task.id === id)).toBeUndefined();
  });

  test("deve retornar erro ao tentar atualizar uma task que não existe", async () => {
    const id = "task-inexistente";
    const input = {
      title: "Tarefa não existente",
      status: true,
    };

    await expect(taskBusiness.updateTask(id, input)).rejects.toThrow(
      "Tarefa não encontrada"
    );
  });

  test("deve retornar erro ao tentar deletar uma task que não existe", async () => {
    const id = "task-inexistente";

    await expect(taskBusiness.deleteTask(id)).rejects.toThrow(
      "Tarefa não encontrada"
    );
  });
});
