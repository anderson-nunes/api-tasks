import { BaseDatabase } from "./BaseDatabase";
import { TaskDB } from "../models/Task";
import { UserDatabase } from "./UserDatabase";

type SearchParams = {
  title: string;
  creator_id: string;
  status?: string;
};

export class TaskDatabase extends BaseDatabase {
  public static TABLE_TASKS = "tasks";

  public async findTasks(search: SearchParams): Promise<TaskDB[]> {
    let query = BaseDatabase.connection(TaskDatabase.TABLE_TASKS)
      .select(
        `${TaskDatabase.TABLE_TASKS}.*`,
        `${UserDatabase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${TaskDatabase.TABLE_TASKS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      );

    if (search.title) {
      query = query.whereLike(
        `${TaskDatabase.TABLE_TASKS}.title`,
        `%${search.title}%`
      );
    }

    if (search.creator_id) {
      query = query.where(
        `${TaskDatabase.TABLE_TASKS}.creator_id`,
        "=",
        search.creator_id
      );
    }

    if (search.status !== undefined) {
      query = query.where(
        `${TaskDatabase.TABLE_TASKS}.status`,
        "=",
        search.status
      );
    }

    const tasksDB: TaskDB[] = await query.orderBy("created_at", "desc");

    return tasksDB;
  }

  public async findTaskById(id: string): Promise<TaskDB | undefined> {
    const [taskDB]: TaskDB[] | undefined[] = await BaseDatabase.connection(
      TaskDatabase.TABLE_TASKS
    )
      .select(`${TaskDatabase.TABLE_TASKS}.*`)
      .where({ id: id });

    return taskDB;
  }

  public async insertTask(taskDB: TaskDB): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.TABLE_TASKS).insert(taskDB);
  }

  public async updateTask(taskDB: TaskDB): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.TABLE_TASKS)
      .update(taskDB)
      .where({ id: taskDB.id });
  }

  public async deleteTask(id: string): Promise<void> {
    await BaseDatabase.connection(TaskDatabase.TABLE_TASKS)
      .where({ id })
      .delete();
  }
}
