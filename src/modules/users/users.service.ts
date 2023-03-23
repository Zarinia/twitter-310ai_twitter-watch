import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';
import { PythonService } from '@python/python.service';
import { DownloadService } from '@/modules/download/download.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    private readonly pythonService: PythonService,
    private readonly downloadService: DownloadService
  ) {

  }

  async create(username: string): Promise<string> {
    try {
      return this.pythonService.fetchUser(username, 1).then(async (res) => {
        try {
          if (typeof res[0]['user']['profile_image_url_https'] !== 'undefined' && res[0]['user']['profile_image_url_https'] !== null) {
            let avatar = res[0]['user']['profile_image_url_https'].split('_normal');
            this.downloadService.download(`${avatar[0]}_400x400${avatar[1]}`, `${res[0]['user']['screen_name']}.jpg`, () => {
              console.log(`Download ${res[0]['user']['screen_name']}'s avatar successfully`);
            });
          }
          if (typeof res[0]['user']['profile_background_image_url_https'] !== 'undefined' && res[0]['user']['profile_background_image_url_https'] !== null) {
            this.downloadService.download(res[0]['user']['profile_background_image_url_https'], `${res[0]['user']['screen_name']}_bg.jpg`, () => {
              console.log(`Download ${res[0]['user']['screen_name']}'s background profile successfully`);
            });
          }
          if (typeof res[0]['user']['profile_banner_url'] !== 'undefined' && res[0]['user']['profile_banner_url'] !== null) {
            this.downloadService.download(res[0]['user']['profile_banner_url'], `${res[0]['user']['screen_name']}_banner.jpg`, () => {
              console.log(`Download ${res[0]['user']['screen_name']}'s banner profile successfully`);
            });
          }
          return res[0]['user'];
        } catch (err) {
          return ('error connecting to twitter');
        }
        // return res[0]['user'];
        // if (typeof res[0]['user']['screen_name'] !== 'undefined') {
        // 	const newUser = new this.usersModel(res[0]['user']);
        // 	return await newUser.save();
        // }else{
        // 	return `This user #${name} not exist`;
        // }
      }).catch((err) => {
        return err;
      });
    } catch (err) {
      return ('error connecting to twitter');
    }
  }

  async fetchByName(name: string): Promise<Users> {
    return this.pythonService.fetchUser(name, 0).then(async (res: Users) => {
      return res[0]['user'];
    }).catch((err) => {
      return err;
    });
  }

  async findByName(name: string): Promise<Users[]> {
    return await this.usersModel.find({ 'screen_name': name }).exec();
  }

  async findAll() {
    return await this.usersModel.find({}, {
      _id: 0,
      uid_str: 1,
      name: 1,
      screen_name: 1,
      followers_count: 1,
      friends_count: 1,
      listed_count: 1,
      favourites_count: 1,
      time_zone: 1,
      created_at: 1
    }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(name: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${name} user`;
  }

  remove(name: string) {
    return this.usersModel.deleteOne({ screen_name: name });
  }

  test() {
    return this.pythonService.test().then((res) => {
      return res;
    });
  }
}
