import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsModule } from '@tweets/tweets.module';
import { UsersModule } from '@users/users.module';
import { PythonService } from '@python/python.service';
import { WebModule } from '@/modules/web/web.module';
import { DownloadService } from '@/modules/download/download.service';
let MONGODB_USER = encodeURIComponent('tweeter');
let MONGODB_PASS = encodeURIComponent('M3423DFC2345Rc5mc');
let mongodbUrl = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@mongodb:27017/twitter`;
// console.log( process.env.DB_URL);
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/twitter'),
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
