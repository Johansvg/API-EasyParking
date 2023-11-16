import { Column, Entity } from "typeorm";

@Entity()
export class ParqueaderoMoto {

    @Column({ primary: true, generated: 'increment' })
    idRegistro: number;

    @Column({ nullable: false })
    placaVehiculoReg: string;

    @Column({ nullable: false })
    tipoVehiculoReg: string;

    @Column({ nullable: false })
    horaIngreso: Date;

}
