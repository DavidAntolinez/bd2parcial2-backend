import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
} 