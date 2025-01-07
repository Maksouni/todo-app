import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Укажите здесь ваш фронтенд-адрес
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если нужно передавать куки или заголовки авторизации
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
