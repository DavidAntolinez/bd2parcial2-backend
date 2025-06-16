import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Plato } from '../../platos/entities/plato.entity';

@Entity('pedido_platos')
export class PedidoPlato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidoPlatos, { onDelete: 'CASCADE' })
  pedido: Pedido;

  @ManyToOne(() => Plato, plato => plato.pedidoPlatos)
  plato: Plato;
} 