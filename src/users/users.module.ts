import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DbRepo } from 'src/dataObjects/dbRepo';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
