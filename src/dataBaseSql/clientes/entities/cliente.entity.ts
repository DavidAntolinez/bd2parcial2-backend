import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Reserva } from '../../reservas/entities/reserva.entity';

@Entity('Clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ type: 'int' })
  telefono: number;

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(() => Reserva, reserva => reserva.cliente)
  reservas: Reserva[];
} 