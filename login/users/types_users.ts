export interface User {
  id: number;
  nombre: string;
  correo: string;
  contraseña: string;
  rol?: 'admin' | 'user';
  activo: boolean;
  creadoEn?: Date;
}
