import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../models/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
 
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
  get(){
    let headers = this.getHeaders();
    return this.http.get<Clientes[]>(this.urlApi+"api/Cliente/listClientes?opcion=0",{headers}   )
  }

   //metodo para consultar clientes por cedula
   getClienteIdentificacion(documento: string){
    let headers = this.getHeaders();
    return this.http.get<Clientes[]>(this.urlApi+"api/Cliente/listClientes?opcion=2&Identificacion=" + documento,{headers}   )
  }

  //metodo para eliminar el registro
  deleteCliente(clientes: Clientes) {
    let headers = this.getHeaders();
    return this.http.delete<Clientes>(this.urlApi +  "api/Cliente/deleteClientes?Id=" + clientes.idCliente ,{headers})
  }

   //metodo para guardar el registro
   post(clientes: Clientes){
    let headers = this.getHeaders();
    return this.http.post<Clientes>(this.urlApi + "api/Cliente/addClientes",clientes, {headers})
  }

   //metodo para traer un solo registro
   getId(id: number){
    let headers = this.getHeaders();
    return this.http.get<Clientes[]>(this.urlApi+"api/Cliente/listClientes?opcion=1&IdCliente=" + id,{headers}   )
  }

  //metodo para  actualizar
  put(clientes: Clientes){
    let headers = this.getHeaders();
    return this.http.put<Clientes>(this.urlApi + "api/Cliente/updateClientes",clientes, {headers})
  }

}
