import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Planes } from 'src/app/models/Planes';
import { PlanesService } from 'src/app/services/Planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {
  planes: Planes[];
  documento : string;
  loading: any;
  existe: boolean = false;
  constructor(private planesService: PlanesService, 
    public loadingController: LoadingController,
    public toastController: ToastController,){}

  ngOnInit(){

  }

  //metodo para consultar datos
  getDatos(){
    if(this.documento != ""){
      this.presentLoading();
      //lista todos los turnos
      this.planesService.get(this.documento).subscribe(data=>{
        this.planes=data;
        this.existe=true;
        console.log("datos", data)
       
      })
    }else{
      console.log("datos requeridos")
      this.presentToast("Ingrese Los Datos Obligatorios.");
    }
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
