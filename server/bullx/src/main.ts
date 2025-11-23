import { randomUUID } from 'crypto';

// Polyfill for crypto.randomUUID if not available
if (!globalThis.crypto) {
  globalThis.crypto = {
    randomUUID: randomUUID,
  } as any;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // or your Next.js dev port
    credentials: true,
  }); // Allow frontend to communicate with backend
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
