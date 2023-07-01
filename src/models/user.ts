import { randomUUID } from "node:crypto";

export type UserDTO = {
  name: string;
  email: string;
}

export class User {
  public id: string;
  public name: string;
  public email: string;

  constructor (params: UserDTO, id?: string) {
    this.id = id ?? randomUUID()
    this.name = params.name;
    this.email = params.email;
  }
}