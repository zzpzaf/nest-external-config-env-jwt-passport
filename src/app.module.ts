import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./src/config/.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      cache: true,
    }),
  ],
})
export class AppModule {}
