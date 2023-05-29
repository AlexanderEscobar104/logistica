import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/Clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  clientes: Clientes[];
  documento: string;
  loading: any;
  existe: boolean = false;

  constructor(
    private clientesService: ClientesService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private route: Router,
    public alertCtrl: AlertController,) { }

  ngOnInit() {
    //tare todos los clientes 
    this.getClientes();
  }

  //tare todos los clientes 
  getClientes() {
    this.clientesService.get().subscribe(data => {
      this.clientes = data;
      console.log("datos getClientes", data)

    })
  }

  //lista todos los datos del cliente al consultar por documento
  getDatos() {
    this.clientesService.getClienteIdentificacion(this.documento).subscribe(data => {
      this.clientes = data;
      console.log("datos getClientes", data)

    })
  }

  //crea el nuevo cliente
  nuevoRegistro() {
    this.route.navigate(["agregarCliente"]);
  }

  //editar registro
  editarCliente(clientes: Clientes): void {
    localStorage.setItem("idCliente", clientes.idCliente.toString())
    this.route.navigate(["editarCliente"]);
  }

  //elimina registro
  eliminarCliente(clientes: Clientes) {
    this.clientesService.deleteCliente(clientes).subscribe(data => {
      this.clientes = this.clientes.filter(t => t !== clientes);
      alert("Cliente Eliminado.")
      this.route.navigate(["clientes"]);
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
