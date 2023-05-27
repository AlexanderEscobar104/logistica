import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanesComponent } from './pages/planes/planes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';

const routes: Routes = [
  {path: 'planes', component: PlanesComponent },
  {path: 'clientes', component: ClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
