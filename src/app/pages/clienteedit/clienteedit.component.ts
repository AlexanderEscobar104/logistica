import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Clientes } from 'src/app/models/Clientes';
import { ClientesService } from 'src/app/services/Clientes.service';

@Component({
  selector: 'app-clienteedit',
  templateUrl: './clienteedit.component.html',
  styleUrls: ['./clienteedit.component.css']
})
export class ClienteeditComponent {
  model: Clientes[];
  loading: any;

  constructor(
    private http: HttpClient,
    private clientesService: ClientesService,
    private route:Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertCtrl: AlertController,){}

  ngOnInit(){
   //busca el registro a editar
   this.consultaRegistro();
  }

  //metodo para consultar el registro a editar
  consultaRegistro(){
    let id = localStorage.getItem("idCliente");
     this.clientesService.getId(+id!).subscribe(data=>{
       this.model = data;
       console.log("editar cliente", this.model[0].nombres)
       console.log("editar cliente", data)
     })
   }

  //metodo para actualizar el registro
  actualizar(clientes: Clientes){
    this.clientesService.put(clientes).subscribe(data=>{
      alert("Dato Actualizado.")
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
