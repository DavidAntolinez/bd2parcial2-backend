import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

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
} 