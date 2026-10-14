import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto.js';
import { IsMongoId } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsMongoId()
  _id: string;
}