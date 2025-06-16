import { IsEmail, IsNotEmpty, IsString, IsNumber, Length } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 150)
  email: string;

  @IsNotEmpty()
  @IsNumber()
  telefono: number;
} 