import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { TweetsSchema } from './schemas/tweets.schema';
import { UsersModule } from '../users/users.module';
import { PythonService } from '../python/python.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Tweets', schema: TweetsSchema }]),
		UsersModule
	],
	controllers: [TweetsController],
	providers: [
		TweetsService,
		PythonService
	],
	exports: [TweetsService]
})
export class TweetsModule {
}
