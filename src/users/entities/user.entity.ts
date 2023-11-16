import { Role } from 'src/common/enums/rol.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User {
    @Column({ primary: true, generated: 'increment' })
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', default: Role.User, enum: Role })
    role: string;

    // @Column({ type: 'boolean', default: false })
    // active : boolean;
}
