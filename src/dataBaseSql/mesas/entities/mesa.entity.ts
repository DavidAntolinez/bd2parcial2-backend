import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  capacidad: number;

  @Column({ length: 100 })
  ubicacion: string;
} 