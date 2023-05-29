import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planes } from '../models/Planes';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  //url conexion a backend
  urlApi = environment.conexionApi

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': 'Bearer ' + localStorage.getItem('access_token')
    });
    return headers;
  }

  //metodo para consultar
  get() {
    let headers = this.getHeaders();
    return this.http.get<Planes[]>(this.urlApi + "api/Planes/listPlanes?opcion=0", { headers })
  }

  //metodo para eliminar el registro
  deletePlan(plan: Planes) {
    let headers = this.getHeaders();
    return this.http.delete<Planes>(this.urlApi + "api/Planes/deletePlanes?Id=" + plan.idPlanEntrega, { headers })
  }

  //metodo para guardar el registro
  post(plan: Planes) {
    let headers = this.getHeaders();
    return this.http.post<Planes>(this.urlApi + "api/Planes/addPlanes", plan, { headers })
  }

  //metodo para traer un solo registro
  getId(id: number) {
    let headers = this.getHeaders();
    return this.http.get<Planes[]>(this.urlApi + "api/Planes/listPlanes?opcion=1&idPlanEntrega=" + id, { headers })
  }

  //metodo para traer un solo registro pro cliente
  getCliente(id: number) {
    let headers = this.getHeaders();
    return this.http.get<Planes[]>(this.urlApi + "api/Planes/listPlanes?opcion=2&IdCliente=" + id, { headers })
  }
  //metodo para  actualizar
  put(plan: Planes) {
    let headers = this.getHeaders();
    return this.http.put<Planes>(this.urlApi + "api/Planes/updatePlanes", plan, { headers })
  }


}
