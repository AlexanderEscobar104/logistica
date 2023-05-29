import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/Clientes.service';

@Component({
  selector: 'app-clienteadd',
  templateUrl: './clienteadd.component.html',
  styleUrls: ['./clienteadd.component.css']
})
export class ClienteaddComponent {
  model = new Clientes();
  loading: any;

  constructor(
    private http: HttpClient,
    private clientesService: ClientesService,
    private route:Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,){}

  ngOnInit(){
   
  }

  //metodo para guardar el registro
  guardar(clientes: Clientes){
    this.clientesService.post(clientes).subscribe(data=>{
      alert("Dato Almacenado.")
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
