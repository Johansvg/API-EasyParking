import { PartialType } from '@nestjs/mapped-types';
import { CreateParqueaderoCarroDto } from './create-parqueadero-carro.dto';

export class UpdateParqueaderoCarroDto extends PartialType(CreateParqueaderoCarroDto) {}
