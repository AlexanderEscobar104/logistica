import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './pages/menu/menu.component';
import { PlanesaddComponent } from './pages/planesadd/planesadd.component';
import { PlaneseditComponent } from './pages/planesedit/planesedit.component';
import { ClienteaddComponent } from './pages/clienteadd/clienteadd.component';
import { ClienteeditComponent } from './pages/clienteedit/clienteedit.component';
import { AlertController } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    PlanesComponent,
    MenuComponent,
    PlanesaddComponent,
    PlaneseditComponent,
    ClienteaddComponent,
    ClienteeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AlertController],
  bootstrap: [AppComponent]
})
export class AppModule { }
