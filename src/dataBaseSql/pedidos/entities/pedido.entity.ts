import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('Pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'int' })
  total: number;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos)
  cliente: Cliente;
} 