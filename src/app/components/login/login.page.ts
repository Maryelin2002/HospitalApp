import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,private fb: FormBuilder, private usuarioService: UsuariosService) { }

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  ngOnInit() {
  }

  IrARegistro(){
    this.router.navigateByUrl("/registro")
  }

  Login(){
    this.usuarioService.login( this.loginForm.value )
    .subscribe( resp => {
      this.router.navigateByUrl("/home");
      console.log(resp);
    }, (err) => {
      console.log(err);
      //Swal.fire('Error', err.error.msg, 'error')
    })
  }

}
