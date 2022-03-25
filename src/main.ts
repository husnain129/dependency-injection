import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module';

async function bootstrap() {
  const PORT = 3000;
  const app = await NestFactory.create(ComputerModule);
  await app.listen(PORT, () =>
    console.log(`Server is running on port - ${PORT}`),
  );
}
bootstrap();
