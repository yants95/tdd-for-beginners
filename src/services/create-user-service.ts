import { UserDTO } from "@/models/user";
import { UsersRepository } from "@/repositories/interfaces/user";

export class CreateUserService {
  constructor (private readonly usersRepository: UsersRepository) {}

  public async execute (user: UserDTO): Promise<void> {
    const usersExists = await this.usersRepository.findByEmail(user.email);
    if (usersExists) throw new Error('Usuário já existe.')
    await this.usersRepository.create(user)
  }
}