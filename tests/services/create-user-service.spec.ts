import { CreateUserService } from "@/services/create-user-service";

import { InMemoryUsersRepository } from "#/repositories/in-memory-users-repository";
import { User, UserDTO } from "@/models/user";

interface Subject {
  usersRepository: InMemoryUsersRepository;
  sut: CreateUserService;
}

const createSubject = (user: User[] = []): Subject => {
  const usersRepository = new InMemoryUsersRepository(user)
  const sut = new CreateUserService(usersRepository)

  usersRepository.create = jest.fn()

  return {
    usersRepository,
    sut
  }
}

describe("CreateUserService", () => {
  const userData: UserDTO = {
    name: 'john doe',
    email: 'johndoe@mail.com'
  }

  const userModel = new User(userData)

  it("should be able to create new user", async () => {
    const { sut, usersRepository } = createSubject()

    await sut.execute(userData)

    expect(usersRepository.create).toHaveBeenNthCalledWith(1, userData)
  })

  it("should not be able to create new user", async () => {
    const { sut, usersRepository } = createSubject([userModel])

    await expect(sut.execute(userData)).rejects.toBeInstanceOf(Error)

    expect(usersRepository.create).not.toHaveBeenCalled()
  })
})