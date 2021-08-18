import { Usuario } from "../models/usuarios.models";




export interface CargarUsuario {
    totalUsuarios: number,
    usuarios: Usuario[];
}