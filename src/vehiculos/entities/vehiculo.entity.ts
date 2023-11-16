
import { Column, Entity } from "typeorm";

@Entity()
export class Vehiculo {
    @Column({ primary: true })
    id: number;

    @Column({ nullable: false })
    tipoVehiculo: string;

    @Column({ unique: true, nullable: false })
    placa: string;
    
    @Column({ nullable: false })
    marca: string;
    
    @Column({ nullable: false })
    modelo: string;

    @Column({ nullable: false })
    color: string;

    @Column({ nullable: false })
    idDueno: number;

}
