import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoProducto } from '../models/TipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
 
    //url conexion a backend
  urlApi= environment.conexionApi 

  constructor(private http:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return headers;
  }
  
  //metodo para consultar todos los clientes
  getLogistica(tipoLogistica: string){
    let headers = this.getHeaders();
    return this.http.get<TipoProducto[]>(this.urlApi+"api/TipoProductos/listTipoProductos?opcion=1&TipoLogistica=" + tipoLogistica,{headers}   )
  }
}