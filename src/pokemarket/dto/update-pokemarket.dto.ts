import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemarketDto } from './create-pokemarket.dto';

export class UpdatePokemarketDto extends PartialType(CreatePokemarketDto) {}
