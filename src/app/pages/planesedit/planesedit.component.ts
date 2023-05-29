import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { Clientes } from 'src/app/models/Clientes';
import { Planes } from 'src/app/models/Planes';
import { TipoProducto } from 'src/app/models/TipoProducto';
import { ClientesService } from 'src/app/services/Clientes.service';
import { PlanesService } from 'src/app/services/Planes.service';
import { TipoProductoService } from 'src/app/services/TipoProductoService.service';

@Component({
  selector: 'app-planesedit',
  templateUrl: './planesedit.component.html',
  styleUrls: ['./planesedit.component.css']
})
export class PlaneseditComponent {

  model: Planes[];
  loading: any;
  total: number;
  tipoproductos: TipoProducto[];
  clientes: Clientes[];
fechaR: string;

  constructor(
    private http: HttpClient,
    private planesService: PlanesService,
    private route:Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private clientesService: ClientesService,
    private tipoProductosService: TipoProductoService,){}

  ngOnInit(){
   //busca el registro a editar
   this.consultaRegistro();
    //tare todos los clientes 
    this.getClientes();
  }

    //tare todos los tipos de productos 
   getTipoProductos(tipoLogistica : string){
    console.log("tipo logis", tipoLogistica)
    this.tipoProductosService.getLogistica(tipoLogistica).subscribe(data=>{
      this.tipoproductos=data;
   
     
    })
  }

  //metodo para calcular el descuento 
  calcularDescuento(planes : Planes){
    console.log("Llego calcularDescuento", planes.cantidad , planes.tipoLogistica)
    if(planes.cantidad > 10 && planes.tipoLogistica == "Maritima"){
      planes.descuento = planes.precioEnvio * 3 /100;
    }else if(planes.cantidad > 10 && planes.tipoLogistica == "Terrestre"){
      planes.descuento = planes.precioEnvio * 5 /100;
    }

    this.total = planes.precioEnvio - planes.descuento;
  }

   //tare todos los clientes 
   getClientes(){
    this.clientesService.get().subscribe(data=>{
      this.clientes=data;
      console.log("datos getClientes", data)
     
    })
  }

  //metodo para consultar el registro a editar
  consultaRegistro(){
    let id = localStorage.getItem("idPlanes");
     this.planesService.getId(+id!).subscribe(data=>{
       this.model = data;
       //consulta el tipo de losgistica asociado 
       this.getTipoProductos(this.model[0].tipoLogistica);
       this.calcularDescuento(this.model[0]);
      
     })
   }

  //metodo para actualizar el registro
  actualizar(planes: Planes){
    if (planes.numeroGuia.length < 10) {
      alert("el numero de guia no es correcto")
      return;
    }
    this.planesService.put(planes).subscribe(data=>{
      alert("Dato Actualizado.")
      this.route.navigate(["planes"]);
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Generando Turnos...',
    });
    await this.loading.present();
  }

  async showMenssage(message: string) {
    let alert = this.alertCtrl.create({
        header: 'Importante',
        message,
        buttons: [{
            text: 'Aceptar'
        }]
    });
    (await alert).present();
    this.loading.dismiss();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
}
