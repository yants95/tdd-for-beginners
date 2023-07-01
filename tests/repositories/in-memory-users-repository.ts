import { randomUUID } from "node:crypto";

import { User, UserDTO } from "@/models/user";
import { UsersRepository } from "@/repositories/interfaces/user"

export class InMemoryUsersRepository implements UsersRepository {
  constructor (private readonly users: User[] = []) {}

  public async create(user: UserDTO): Promise<void> {
    this.users.push({
      id: randomUUID(),
      ...user
    })
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);
    return user ? user : undefined;
  }
}