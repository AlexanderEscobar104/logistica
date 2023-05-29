import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Planes } from '../models/Planes';
import { Usuario } from '../models/Usuario';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    //url conexion a backend
    urlApi = environment.conexionApi

    constructor(private http: HttpClient) { }

    //metodo para generar token
    postUsuario(usuario: Usuario) {
        return this.http.post<Usuario>(this.urlApi + "security/createToken", usuario)
    }


}
