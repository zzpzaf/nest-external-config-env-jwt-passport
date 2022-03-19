import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TransformInterceptor } from './app-interceptors/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appGlobalPrefix = configService.get<string>('APP_GLOBAL_PREFIX', '');
  app.setGlobalPrefix(appGlobalPrefix);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  //await app.listen(3000);
  const appPort = configService.get<number>('APP_PORT', 3000);
  await app.listen(appPort);

  const stage = process.env.STAGE;
  Logger.log(
    'App is running in "' +
      stage +
      '" stage, and it is listening at: http://localhost:' +
      appPort +
      '/' +
      appGlobalPrefix +
      '/',
  );
}
bootstrap();
