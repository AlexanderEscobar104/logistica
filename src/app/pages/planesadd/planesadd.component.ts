import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Clientes } from 'src/app/models/Clientes';
import { Planes } from 'src/app/models/Planes';
import { TipoProducto } from 'src/app/models/TipoProducto';
import { ClientesService } from 'src/app/services/Clientes.service';
import { PlanesService } from 'src/app/services/Planes.service';
import { TipoProductoService } from 'src/app/services/TipoProductoService.service';

@Component({
  selector: 'app-planesadd',
  templateUrl: './planesadd.component.html',
  styleUrls: ['./planesadd.component.css']
})
export class PlanesaddComponent {

  model = new Planes();
  loading: any;
  clientes: Clientes[];
  tipoproductos: TipoProducto[];
  total: number;
  placaValida: boolean;
  flotaValida: boolean;
  constructor(
    private http: HttpClient,
    private planesService: PlanesService,
    private route: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private clientesService: ClientesService,
    private tipoProductosService: TipoProductoService,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    //tare todos los clientes 
    this.getClientes();

  }

  validarPlaca(placa: string) {
    const regexPlaca = /^[a-zA-Z]{3}[0-9]{3}$/;
    if (regexPlaca.test(placa)) {
      this.placaValida = true;
    } else {
      this.placaValida = false;

    }
  }

  validarFlota(flota: string) {
    const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}$/;
    if (regexPlaca.test(flota)) {
      this.flotaValida = true;
    } else {
      this.flotaValida = false;

    }
  }

  //metodo para guardar el registro
  guardar(planes: Planes) {
    if (this.model.numeroGuia.length < 10) {
      alert("el numero de guia no es correcto")
      return;
    }

    if (this.model.tipoLogistica == "Terrestre") {
      this.validarPlaca(this.model.placa)
      if (this.placaValida == false) {
        alert("el numero de placa no es valido")
        console.log("placa no valida")
        return;
      }
    }

    if (this.model.tipoLogistica == "Maritima") {
      this.validarFlota(this.model.numeroFlota)
      if (this.flotaValida == false) {
        alert("el numero de flota no es valido")
        console.log("FLOTA no valida")
        return;
      }
    }


    this.planesService.post(planes).subscribe(data => {
      alert("Dato Almacenado.")
      this.route.navigate(["planes"]);
    })
  }

  //tare todos los tipos de productos 
  getTipoProductos() {
    this.tipoProductosService.getLogistica(this.model.tipoLogistica).subscribe(data => {
      this.tipoproductos = data;


    })
  }
  //metodo para calcular el descuento 
  calcularDescuento() {
    console.log("Llego calcularDescuento", this.model.cantidad, this.model.tipoLogistica)
    if (this.model.cantidad > 10 && this.model.tipoLogistica == "Maritima") {
      this.model.descuento = this.model.precioEnvio * 3 / 100;
    } else if (this.model.cantidad > 10 && this.model.tipoLogistica == "Terrestre") {
      this.model.descuento = this.model.precioEnvio * 5 / 100;
    }

    this.total = this.model.precioEnvio - this.model.descuento;
  }

  //tare todos los clientes 
  getClientes() {
    this.clientesService.get().subscribe(data => {
      this.clientes = data;
      console.log("datos getClientes", data)

    })
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Generando Turnos...',
    });
    await this.loading.present();
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
