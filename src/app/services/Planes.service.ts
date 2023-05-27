import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Planes } from '../models/Planes';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
    //url conexion a backend
  urlApi= environment.conexionApi 

  constructor(private http:HttpClient) { }

  //metodo para consultar
  get(Documento : string){
    return this.http.get<Planes[]>(this.urlApi+"/Usuarios?Documento=" + Documento  )
  }

  

}
