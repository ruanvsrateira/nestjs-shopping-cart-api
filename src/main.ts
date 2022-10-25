import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { API_PORT, SESSION_SECRET } from './settings';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config documentação swagger

  const docConfig = new DocumentBuilder()
    .setTitle('Documentação swagger - Shopping car api')
    .setDescription(
      'Aplicação criada com intuito de mostrar um exeplo de sistema, de um mercado aonde vc consegue: CADASTRAR, EDITAR, DELETAR usuários. CADASTRAR, EDITAR, DELETAR produtos. Por último adicionar produtos ao carrinho do usuário logado',
    )
    .setVersion('1.0')
    .addTag('Shopping cart API')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  // adicionando sessions ao projeto e globalpipe

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(API_PORT);
}
bootstrap();
