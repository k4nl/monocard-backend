import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerbankDto } from './create-playerbank.dto';

export class UpdatePlayerbankDto extends PartialType(CreatePlayerbankDto) {}
