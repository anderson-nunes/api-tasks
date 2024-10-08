export interface TaskDB {
  id: string;
  title: string;
  status: boolean;
  creator_id: string;
  created_at: string;
}

export interface TaskModel {
  id: string;
  title: string;
  status: boolean;
  creatorId: string;
  createdAt: string;
}

export class Task {
  constructor(
    private id: string,
    private title: string,
    private status: boolean,
    private creatorId: string,
    private createdAt?: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(value: string): void {
    this.title = value;
  }

  public getStatus(): boolean {
    return this.status;
  }

  public setStatus(value: boolean): void {
    this.status = value;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public setCreatorId(value: string): void {
    this.creatorId = value;
  }

  public getCreatedAt(): string {
    return this.createdAt || "";
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public toDBModel(): TaskDB {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      creator_id: this.creatorId,
      created_at: this.createdAt || "",
    };
  }

  public toBusinessModel(): TaskModel {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      creatorId: this.creatorId,
      createdAt: this.createdAt || "",
    };
  }
}
