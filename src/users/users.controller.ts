import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Headers,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/dataObjects/user.entity';
import { CreateUserDto } from 'src/dataObjects/users-create-new.dto';
import { UserDataDto } from 'src/dataObjects/users-filter.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService) {}

  @Get()
  async getUsers(@Headers('Authorization') authorization = '', @Query() filterDto: UserDataDto): Promise<User[]> {
    return this.userService.getUsers(filterDto);
  }

  @Get('/:id') 
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id/')
  updateUser(
    @Param('id') id: string,
    @Query() userDataDto: UserDataDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userDataDto);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    const ret = this.userService.deleteUserById(id);
    return ret;
  }
}
