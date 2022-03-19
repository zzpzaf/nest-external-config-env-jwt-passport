import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/dataObjects/user.entity';
import { CreateUserDto } from './users-create-new.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from './users-filter.dto';
import { AuthCredentialsDto } from './user-auth-credentials.dto';
import { UsersDB } from './usersDB';

@Injectable()
export class DbRepo {
  constructor() {
    this.myUsers = UsersDB.getInitialUsers();
  }
  private readonly logger = new Logger(DbRepo.name);
  private myUsers: User[];

  async getUsers(filterDto: UserDataDto): Promise<User[]> {

    const filteredUsers: User[] = this.findByObjectTemplate(
      this.myUsers,
      filterDto,
    );
    if (filteredUsers.length <= 0) {
      throw new NotFoundException(`Users not found!`);
    }
    return filteredUsers;
  }

  async getUserById(id: string): Promise<User> {
    const user = <User>this.myUsers.find((uf) => uf.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found!`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, email } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const uid = uuidv4();
   
    this.checkUserExistence(username, email);

    const newUser: User = new User({
      id: uid,
      username,
      password: hashedPassword,
      email,
      registrationdate: new Date(),
      confirmed: false,
      canceled: false,
      typeid: 4,
      countryid: 28,
    });
    this.myUsers.push(newUser);

    const user = this.myUsers.at(-1);
    if (!user) {
      throw new Error(`New User can NOT be created!`);
    }
    return user;
  }

  async updateUser(id: string, userDataDto: UserDataDto): Promise<User> {
    var user: User = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id.toString}" not found!`);
    }

    this.checkUserExistence(userDataDto.username!, userDataDto.email!);
    user = this.updateMatchingObjectProperties(user, userDataDto);
    
    return user;
  }

  async deleteUserById(id: string): Promise<void> {
    const user = <User>await this.getUserById(id);

    let index = await this.myUsers.indexOf(user);
    this.myUsers.splice(index, 1);
    index = this.myUsers.indexOf(user);
    if (index > 0) {
      throw new Error(`User with ID "${id}" can NOT be deleted!`);
    }

  }

  async userFindByNameAndMatchingPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { username, password } = authCredentialsDto;

    let user!: User;
    const filteredUsers: User[] = this.findByObjectTemplate(this.myUsers, {
      username,
    });
    for await (const uf of filteredUsers) {
      if (await bcrypt.compare(password, uf.password)) {
        user = uf;
      }
    }
    return user;
  }

  private findByObjectTemplate(allUsers: User[], objectTemplate: any) {
    return allUsers.filter((u: User) => {
      return Object.keys(objectTemplate).every(
        (propertyName) =>
          u[propertyName as keyof User] == objectTemplate[propertyName],
      );
    });
  }

  private updateMatchingObjectProperties(obj1: any, obj2: any): any {
    for (var i in Object.keys(obj2)) {
      for (var j in Object.keys(obj1)) {
        if (Object.keys(obj1)[j] == Object.keys(obj2)[i]) {
          obj1[Object.keys(obj1)[j]] = obj2[Object.keys(obj2)[i]];
        }
      }
    }
    return obj1;
  }

  private checkUserExistence(username: string, email: string): void {
    let property!: string;

    const existingUser = this.myUsers.find(
      (uf) => uf.username === username || uf.email === email,
    );

    if (existingUser) {
      if (existingUser.email === email) property = 'Email';
      else property = 'Username';
      throw new HttpException(
        'User with the same ' + property + ' already exists!',
        HttpStatus.CONFLICT,
      );
    }
  }
}
