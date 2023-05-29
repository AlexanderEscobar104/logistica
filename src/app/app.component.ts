import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { Usuario } from './models/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'logistica';
  constructor(private router:Router, private tokenService: TokenService){
    //genera token
    this.generarToken();
    this.router.navigate(["planes"]);
  }

  generarToken() {
     const user = new Usuario();
     user.userName = "admin"
     user.password = "admin"

    this.tokenService.postUsuario(user).subscribe(data=>{
      console.log("datos", data)
     localStorage.setItem('access_token', data.toString())
    })
    
  }
}
