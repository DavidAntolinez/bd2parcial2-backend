import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoPlato } from '../../pedidos/entities/pedido-plato.entity';

@Entity('Platos')
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  categoria: string;

  @Column({ type: 'int' })
  precio: number;

  @Column({ default: true })
  disponible: boolean;

  @Column({ default: false })
  esVegano: boolean;

  @Column({ default: false })
  tieneGluten: boolean;

  @Column({ default: false })
  esVegetariano: boolean;

  @Column({ default: false })
  tieneLactosa: boolean;

  @OneToMany(() => PedidoPlato, pedidoPlato => pedidoPlato.plato)
  pedidoPlatos: PedidoPlato[];
} 