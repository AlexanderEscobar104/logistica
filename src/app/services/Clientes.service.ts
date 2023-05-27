import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
    //url conexion a backend
  urlApi= environment.conexionApi 

  constructor(private http:HttpClient) { }

  //metodo para consultar
  get(Documento : string){
    return this.http.get<Clientes[]>(this.urlApi+"/Usuarios?Documento=" + Documento  )
  }

  

}
