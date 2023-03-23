import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsModule } from '@tweets/tweets.module';
import { UsersModule } from '@users/users.module';
import { PythonService } from '@python/python.service';
import { WebModule } from '@/modules/web/web.module';
import { DownloadService } from '@/modules/download/download.service';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/twitter'),
    // MongooseModule.forRoot(process.env.DB_URL),
    // MongooseModule.forRoot(mongodbUrl),
    TweetsModule,
    UsersModule,
    WebModule
  ],
  controllers: [AppController],
  providers: [AppService, PythonService, DownloadService]
})
export class AppModule {
}
