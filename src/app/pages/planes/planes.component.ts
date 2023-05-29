import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Clientes } from 'src/app/models/Clientes';
import { Planes } from 'src/app/models/Planes';
import { ClientesService } from 'src/app/services/Clientes.service';
import { PlanesService } from 'src/app/services/Planes.service';
import { TipoProductoService } from 'src/app/services/TipoProductoService.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {
  planes: Planes[];
  clientes: Clientes[];
  documento: number;
  loading: any;
  existe: boolean = false;
  constructor(private planesService: PlanesService,
    private clientesService: ClientesService,
    private tipoProductoService: TipoProductoService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private route: Router,) { }

  ngOnInit() {
    //tare todos los clientes 
    this.getClientes();
    //lista todos los planes
    this.getDatos();
  }

  //tare todos los clientes 
  getClientes() {
    this.clientesService.get().subscribe(data => {
      this.clientes = data;
      console.log("datos getClientes", data)

    })
  }

  //lista todos los datos del cliente al consultar por documento
  getDatosPlanCliente() {
    this.planesService.getCliente(this.documento).subscribe(data => {
      this.planes = data;

    })
  }


  //metodo para consultar datos
  getDatos() {
    //lista todos los datos
    this.planesService.get().subscribe(data => {
      this.planes = data;
      this.existe = true;
      console.log("datos", data)
    })
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

  nuevoRegistro() {
    this.route.navigate(["agregarPlanes"]);
  }

  //editar registro
  editarCliente(plan: Planes): void {
    localStorage.setItem("idPlanes", plan.idPlanEntrega.toString())
    this.route.navigate(["editarPlanes"]);
  }

  //elimina registro
  eliminarCliente(plan: Planes) {
    this.planesService.deletePlan(plan).subscribe(data => {
      this.planes = this.planes.filter(t => t !== plan);
      alert("reegistro Eliminado.")
      this.route.navigate(["planes"]);
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

}
