import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUnoDto } from './dto/create-uno.dto';
import { UnosService } from './unos.service';

@Controller('unos')
export class UnosController {
  constructor(private readonly unosService: UnosService) {}

  @Post()
  create(@Body() createUnoDto: CreateUnoDto) {
    return this.unosService.create(createUnoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unosService.findOne(id);
  }
}
