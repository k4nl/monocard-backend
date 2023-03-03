import { Injectable } from '@nestjs/common';
import { CreatePlayerbankDto } from './dto/create-playerbank.dto';
import { UpdatePlayerbankDto } from './dto/update-playerbank.dto';

@Injectable()
export class PlayerbankService {
  create(createPlayerbankDto: CreatePlayerbankDto) {
    return 'This action adds a new playerbank';
  }

  findAll() {
    return `This action returns all playerbank`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerbank`;
  }

  update(id: number, updatePlayerbankDto: UpdatePlayerbankDto) {
    return `This action updates a #${id} playerbank`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerbank`;
  }
}
