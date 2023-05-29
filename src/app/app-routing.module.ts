import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteeditComponent } from './pages/clienteedit/clienteedit.component';
import { ClienteaddComponent } from './pages/clienteadd/clienteadd.component';
import { PlaneseditComponent } from './pages/planesedit/planesedit.component';
import { PlanesaddComponent } from './pages/planesadd/planesadd.component';

const routes: Routes = [
  { path: 'planes', component: PlanesComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'editarCliente', component: ClienteeditComponent },
  { path: 'agregarCliente', component: ClienteaddComponent },
  { path: 'editarPlanes', component: PlaneseditComponent },
  { path: 'agregarPlanes', component: PlanesaddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
