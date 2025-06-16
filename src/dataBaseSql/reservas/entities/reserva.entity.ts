import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Mesa } from '../../mesas/entities/mesa.entity';

@Entity('Reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @ManyToOne(() => Cliente, cliente => cliente.reservas)
  cliente: Cliente;

  @ManyToOne(() => Mesa, mesa => mesa.reservas)
  mesa: Mesa;
} 