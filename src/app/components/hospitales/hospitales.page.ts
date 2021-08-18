import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Hospital } from 'src/app/models/hospitales.model';
import { HospitalService } from '../../services/hospital.service'
import { BusquedaService } from '../../services/busqueda.service'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.page.html',
  styleUrls: ['./hospitales.page.scss'],
})
export class HospitalesPage implements OnInit {

  public hospital: Hospital[] = [];
  public hospitalTemp: Hospital[] = [];
  public nombreHospitalText: string;
  
  constructor(public alertController: AlertController,private servicio: HospitalService,
    private busquedaService: BusquedaService ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar hospital',
      inputs: [
        {
          name: 'nombreHospital',
          type: 'text',
          placeholder: 'Nombre',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            this.servicio.crearHospital(alertData.nombreHospital).subscribe(resp => {
              this.cargarHospitales();
            })
          }
        }
      ]
    });

    

    await alert.present();
  }


  cargarHospitales(){
    this.servicio.cargarHospitales().subscribe(
      hospitales => {
        this.hospital = hospitales;
        this.hospitalTemp = hospitales;
      }
    )
  }


  actualizarHospital( hospital: Hospital ){
    this.servicio.actualizarHospital( hospital._id, hospital.nombre ).subscribe(
      resp => {
        this.cargarHospitales();
      });
  }

  async eliminarHospital( hospital: Hospital ){

    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar usuario',
      message: `Esta a punto de borrar a ${ hospital.nombre }`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.servicio.eliminarHospital( hospital._id ).subscribe(
              resp => {
                this.cargarHospitales();
              })
          }
        }
      ]
    });

    await alert.present();


  }

  
  BuscarHospital( termino: string ){

    if( termino.length === 0 ){
      return this.hospital = this.hospitalTemp
    }

    this.busquedaService.buscar('hospitales', termino ).subscribe( resp => {
      this.hospital = resp;
    })
  }


  async presentAlertPromptEditar( hospital: Hospital ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar hospital',
      inputs: [
        {
          name: 'nombreHospitalEditar',
          type: 'text',
          placeholder: `${ hospital.nombre }`
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            this.servicio.actualizarHospital(hospital._id,alertData.nombreHospitalEditar).subscribe(resp => {
              this.cargarHospitales();
            })
          }
        }
      ]
    });

    

    await alert.present();
  }

}
