import { PartialType } from '@nestjs/mapped-types';
import { BaseUsersDto } from './base-users.dto';

export class UpdateUserDto extends PartialType(BaseUsersDto) {}
