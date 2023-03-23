import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbs from 'hbs';
import { join } from 'path';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { apiUrl, environment, port as appPort } from '@/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { avatarImage, chain, escape, ifCond, jsonParse, jsonStringify, nFormatter, textSplit } from './hbs/helpers';

const port = appPort || 3000;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(helmet());
	// app.useGlobalPipes(
	//     new ValidationPipe({
	//         whitelist: true,
	//         transform: true,
	//         validationError: { target: false },
	//     }),
	// );
	if (environment === 'development') {
		app.enableCors();
		const swaggerBuilder = new DocumentBuilder()
			.setTitle('Twitter API')
			.setDescription('Twitter api helper')
			.addBearerAuth()
			.addServer(apiUrl)
			.setVersion('1.1.0')
			.build();
		const docs = SwaggerModule.createDocument(app, swaggerBuilder);
		SwaggerModule.setup('/docs', app, docs);
	}

	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
	app.set('view options', { layout: 'index' });
	app.setViewEngine('hbs');
	hbs.registerHelper('jsonStringify', jsonStringify);
	hbs.registerHelper('jsonParse', jsonParse);
	hbs.registerHelper('escape', escape);
	hbs.registerHelper('avatarImage', avatarImage);
	hbs.registerHelper('ifCond', ifCond);
	hbs.registerHelper('nFormatter', nFormatter);
	hbs.registerHelper('textSplit', textSplit);
	hbs.registerHelper('chain', chain);
	await app.listen(port);
	Logger.log(`Server running on port: ${port}`, 'bootstrap');
}

bootstrap();
