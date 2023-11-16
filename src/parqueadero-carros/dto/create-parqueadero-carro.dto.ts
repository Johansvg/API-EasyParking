import { Transform } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class CreateParqueaderoCarroDto {

    @Transform(({value}) => value.trim())
    @IsString()
    @Length(6)
    placaVehiculoReg: string;

    @IsOptional()
    tipoVehiculoReg: string;

    @IsOptional()
    horaIngreso: Date;

    
}
