import { PartialType } from '@nestjs/mapped-types';
import { BaseTweetsDto } from './base-tweets.dto';

export class UpdateTweetsDto extends PartialType(BaseTweetsDto) {}
