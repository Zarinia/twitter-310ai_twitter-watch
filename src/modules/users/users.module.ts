import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { PythonService } from '@python/python.service';
import { DownloadService } from '@/modules/download/download.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }])],
	controllers: [UsersController],
	providers: [UsersService, PythonService, DownloadService],
	exports: [UsersService]
})
export class UsersModule {
}
