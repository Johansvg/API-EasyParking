import { IsOptional, IsString, Length } from "class-validator";
import { Transform } from "class-transformer";

export class CreateParqueaderoDto {
    @Transform(({value}) => value.trim())
    @IsString()
    @Length(6)
    placaVehiculoReg: string;

    @IsOptional()
    tipoVehiculoReg: string;

    @IsOptional()
    horaIngreso: Date;
}
