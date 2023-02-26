import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';




async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BACKEND NESTJS CODICA')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('VasGen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

//  app.useGlobalGuards(ApiKeyAuthGuard); // запрет доступа ко всем эедпойнтам для незарегистрированных (незалогированных)
  //пользоваьтелей
  // app.useGlobalPipes(new ValidationPipe()) 

  await app.listen(PORT, () => {
    console.log(`Server run on port=${PORT}`);
  });
}

start();
