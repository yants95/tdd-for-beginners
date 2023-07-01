import { User, UserDTO } from "@/models/user";

export interface UsersRepository {
  create: (params: UserDTO) => Promise<void>
  findByEmail: (email: string) => Promise<User | undefined>
}
