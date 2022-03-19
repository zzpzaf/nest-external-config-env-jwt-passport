import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dataObjects/users-create-new.dto';
import { AuthService } from './auth.service';
import { User } from 'src/dataObjects/user.entity';
import { AuthCredentialsDto } from 'src/dataObjects/user-auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signup(createUserDto);
  }
}
