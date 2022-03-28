import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['user'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT, () =>
    console.log(`Server is running on port - ${PORT}`),
  );
}
bootstrap();
