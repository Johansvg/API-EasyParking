import { PartialType } from '@nestjs/mapped-types';
import { CreateParqueaderoDto } from './create-parqueadero.dto';

export class UpdateParqueaderoDto extends PartialType(CreateParqueaderoDto) {}
