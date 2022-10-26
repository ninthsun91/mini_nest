import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule, {});

// app.userGlobal

await app.listen(3030);
console.log('SERVER RUNNING ON 3030');
}
bootstrap();
