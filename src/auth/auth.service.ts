import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dataObjects/user-auth-credentials.dto';
import { User } from 'src/dataObjects/user.entity';
import { CreateUserDto } from 'src/dataObjects/users-create-new.dto';
import { DbRepo } from 'src/dataObjects/dbRepo';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from 'src/dataObjects/user-jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(private dbRepo: DbRepo, private jwtService: JwtService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.dbRepo.createUser(createUserDto);
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username: string = authCredentialsDto.username;
    
    const user = await this.dbRepo.userFindByNameAndMatchingPassword(
      authCredentialsDto,
    );

    if (user) {
      const typeid = user.typeid;
      const payload: UserJwtPayload = { username, typeid };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }
}
