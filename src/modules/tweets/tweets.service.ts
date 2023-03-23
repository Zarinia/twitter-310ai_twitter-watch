import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tweets } from './schemas/tweets.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { PythonService } from '../python/python.service';
import { Users } from '@users/schemas/users.schema';


@Injectable()
export class TweetsService {
	constructor(
		@InjectModel('Tweets') private readonly tweetsModel: Model<Tweets>,
		private readonly usersService: UsersService,
		private readonly pythonService: PythonService
	) {
	}
	
	async findAll(): Promise<Tweets[]> {
		return await this.tweetsModel.find().exec();
	}
	
	async findOne(id: string): Promise<Tweets> {
		return await this.tweetsModel.findById(id).exec();
	}
	
	async create(tweets: Tweets): Promise<Tweets> {
		const newTweets = new this.tweetsModel(tweets);
		return await newTweets.save();
	}
	
	async update(id: string, tweets: Tweets): Promise<Tweets> {
		return await this.tweetsModel.findByIdAndUpdate(id, tweets, { new: true });
	}
	
	async delete(id: string): Promise<Tweets> {
		return await this.tweetsModel.findByIdAndRemove(id);
	}
	
	async findTweets(args: object) {
		try {
			let lastTweetId = null;
			let user: Users[] = await this.usersService.findByName(args['username']);
			let userFound = user.pop();
			let allTweets: Tweets[] = await this.findByUserId(userFound['uid_str']);
			if (allTweets.length > 0) {
				lastTweetId = allTweets[0]['tid_str'];
			}
			console.log(user);
			return this.pythonService.run(args['username'], lastTweetId, args['count']).then(async (res) => {
				return res;
			}).catch((err) => {
				return err;
			});
		} catch (err) {
			return ('error connecting to twitter');
		}
		// const pythonProcess = spawn('scripts/python/venv/bin/python', ['scripts/python/src/get-tweets.py', 'ar_zarinia', 'since-id', 'max-id']);
		// let result = '';
		// pythonProcess.stdout.on(`data`, (data) => {
		// 	resolve(eval(`(${data.toString()})`));
		// });
		// pythonProcess.stderr.on('data', (data) => {
		// 	reject(data.toString());
		// });
		// pythonProcess.on('close', function(code) {
		// 	resolve(result);
		// });
		// pythonProcess.on('error', function(err) {
		// 	reject(err);
		// });
		
	}
	
	async findByUserId(uid: string): Promise<Tweets[]> {
		return await this.tweetsModel.find({ 'uid_str': uid }).sort({ tid_str: 'desc' }).exec();
	}
}
