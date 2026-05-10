import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { env } from 'src/config/env.config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: env.CLIENT_URL,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');
  await app.listen(env.PORT);
}

bootstrap()
  .then(() =>
    console.log(
      `🚀 Server running on port ${env.PORT} at http://localhost:${env.PORT}`,
    ),
  )
  .catch((err) => console.error(`Server failed to start ${err}`));
