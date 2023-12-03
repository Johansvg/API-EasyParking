import { IsString, Length, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateInvitadoDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @Length(6)
    placaVehiculoReg: string;

    @IsOptional()
    tipoVehiculoReg: string;

    @IsOptional()
    horaIngreso: Date;

}