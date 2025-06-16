import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('Mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ length: 100 })
  ubicacion: string;

  @OneToMany(() => Reserva, reserva => reserva.mesa)
  reservas: Reserva[];
} 