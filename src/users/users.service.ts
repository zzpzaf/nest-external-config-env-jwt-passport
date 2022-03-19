import { Injectable } from '@nestjs/common';
import { User } from 'src/dataObjects/user.entity';
import { CreateUserDto } from 'src/dataObjects/users-create-new.dto';
import { UserDataDto } from 'src/dataObjects/users-filter.dto';
import { DbRepo } from 'src/dataObjects/dbRepo';

@Injectable()
export class UsersService {
  constructor(private dbRepo: DbRepo) {}

  async getUsers(filterDto: UserDataDto): Promise<User[]> {
    return await this.dbRepo.getUsers(filterDto);
  }

  async getUserById(id: string): Promise<User> {
    return await this.dbRepo.getUserById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.dbRepo.createUser(createUserDto);
  }

  async updateUser(id: string, userDataDto: UserDataDto): Promise<User> {
    return await this.dbRepo.updateUser(id, userDataDto);
  }

  async deleteUserById(id: string): Promise<void> {
    return await this.dbRepo.deleteUserById(id);
  }
}
