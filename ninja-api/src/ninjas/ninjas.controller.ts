import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  //GET /ninjas?weapon=fast ----> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'gun' | 'sord') {
    return this.ninjasService.getNinjas(weapon);
  }

  //GET /ninjas/:id ----> {...}
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  //POST /ninjas ----> {...}
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  //PUT /ninjas/:id ----> {...}
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  //DELETE /ninjas/:id ----> {...}
  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id);
  }
}
