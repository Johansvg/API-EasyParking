import { Column, Entity } from "typeorm";

@Entity()
export class HistorialCarro {

    @Column({ primary: true, generated: 'increment' })
    idRegistro: number;

    @Column({ nullable: false })
    placaVehiculoReg: string;

    @Column({ nullable: false })
    tipoVehiculoReg: string;

    @Column({ nullable: false })
    horaIngreso: Date;

    @Column({ nullable: false })
    horaSalida: Date;

}