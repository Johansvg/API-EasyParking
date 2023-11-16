import { PartialType } from '@nestjs/mapped-types';
import { CreateParqueaderoMotoDto } from './create-parqueadero-moto.dto';

export class UpdateParqueaderoMotoDto extends PartialType(CreateParqueaderoMotoDto) {}
