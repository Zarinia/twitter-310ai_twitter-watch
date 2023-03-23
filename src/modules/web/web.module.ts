import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebController } from './web.controller';
import { UsersModule } from '@users/users.module';
import { TweetsModule } from '@tweets/tweets.module';

@Module({
	imports: [UsersModule,TweetsModule],
	controllers: [WebController],
	providers: [WebService]
})
export class WebModule {
}
