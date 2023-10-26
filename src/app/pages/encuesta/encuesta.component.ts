import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EncuestaService } from 'src/app/services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent  implements OnInit {
  public medioTransporteDisabled: boolean = true;
  public listaTransportes: string[] = [];
  public listaPublico: string[] = ["Metro", "Micro", "Bus", "Taxi", "Uber", "Colectivo"];
  public listaPrivado: string[] = ["Auto", "Moto", "Otro"];

  constructor(
    private router : Router, 
    private fb : FormBuilder, 
    private alertController : AlertController,
    private encuestaService : EncuestaService
    ){ }

    encuestaForm = this.fb.group({
      Publico_Privado  : new FormControl('', [Validators.required]),
      MedioTransporte  : new FormControl('', [Validators.required]),
      KM : new FormControl('', [Validators.required, Validators.min(0)]),
    });
    

  ngOnInit() {}

  handleChange(e: Event) {
    const eValue = (e.target as HTMLInputElement).value;
    console.log((e.target as HTMLInputElement).value);
    if(eValue == "publico"){
      this.listaTransportes = this.listaPublico;
      this.medioTransporteDisabled =  false;
    }
    else if(eValue == "privadoSinCompartir"){
      this.listaTransportes = this.listaPrivado;
      this.medioTransporteDisabled =  false;
    }
    else if(eValue == "privadoCompartir"){
      this.listaTransportes = this.listaPrivado;
      this.medioTransporteDisabled =  false;
    }
  }

  backToLogin(){
    this.router.navigate(["/"]);
  }

  async submitForm(){
    console.log("SubmitLoginForm");
    this.encuestaService.guardarEncuesta(this.encuestaForm.value).subscribe({
      next : (resp : any) => {
        console.log(resp);
        this.router.navigate(["/finalizacion"]);
      },
      error: async err => {
        console.log(err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    });
  }

}