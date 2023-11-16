import { IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateVehiculoDto {

    id: number;

    @IsString()
    @IsNotEmpty()
    tipoVehiculo: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    placa: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    marca: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    modelo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    color: string;

    idDueno: number;
}
