import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
})
export class RegistrarmePage implements OnInit {

  public formSubmitted = false;

  constructor(private router: Router, private servicio: UsuariosService, private fb: FormBuilder, 
    public alertController: AlertController) { }

  ngOnInit() {
  }

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });


  IrALogin(){
    this.router.navigateByUrl("/login")
  }

  async crearUsuario(){

    this.formSubmitted = true;
    this.servicio.crearUsuario( this.registerForm.value )
    .subscribe( async resp => {
      const alert = this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Registro de usuario',
        message: `Cuenta creada correctamente`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
            }
          }, {
            text: 'Confirmar',
            handler: () => {
            }
          }
        ]
      });
  
      (await alert).present();
      this.router.navigateByUrl("/login")
    }, async (err) => {
      // Si sucede un error
      const alert = this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Registro de usuario',
        message: `Fallo en la creacion de cuenta, intentelo de nuevo`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
            }
          }, {
            text: 'Confirmar',
            handler: () => {
            }
          }
        ]
      });
  
      (await alert).present();
    })
  }

}
