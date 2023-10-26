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
  public listaTransportes: any[] = [];
  public listaPublico: any[] =[{id: 1, nombre: "Metro"},{id: 2, nombre: "Micro"},{id: 3, nombre: "Bus"},{id: 4, nombre: "Taxi"},{id: 5, nombre: "Uber"},{id: 6, nombre: "Colectivo"}];
  public listaPrivado: any[] = [{id: 7, nombre: "Auto"},{id: 8, nombre: "Moto"},{id: 9, nombre: "Otro"}];
/*   public listaPublico: string[] = ["Metro", "Micro", "Bus", "Taxi", "Uber", "Colectivo"];
  public listaPrivado: string[] = ["Auto", "Moto", "Otro"]; */

    encuestaDTO : encuestaDTO = {
      estadoEncuesta : 1,
      kmAproximado : 0,
      tiempoAproximado : 0,
      transporteId : 0,
      usuarioId: "x"
    }

  constructor(
    private router : Router, 
    private fb : FormBuilder, 
    private alertController : AlertController,
    private encuestaService : EncuestaService
    ){ }

    encuestaForm = this.fb.group({
      Publico_Privado  : new FormControl('', [Validators.required]),
      TransporteId  : new FormControl('', [Validators.required]),
      KmAproximado : new FormControl('', [Validators.required, Validators.min(0)]),
      TiempoAproximado : new FormControl('', [Validators.required, Validators.min(0)]),
    });
    

  ngOnInit() {}

  handleChange(e: Event) {
    const eValue = (e.target as HTMLInputElement).value;
    console.log((e.target as HTMLInputElement).value);
    if(eValue == "1"){
      this.listaTransportes = this.listaPublico;
      this.medioTransporteDisabled =  false;
    }
    else if(eValue == "2"){
      this.listaTransportes = this.listaPrivado;
      this.medioTransporteDisabled =  false;
    }
    else if(eValue == "3"){
      this.listaTransportes = this.listaPrivado;
      this.medioTransporteDisabled =  false;
    }
  }

  backToLogin(){
    this.router.navigate(["/"]);
  }

  submitForm(){
    console.log("SubmitEncuestaForm");

    this.encuestaDTO.tiempoAproximado = parseInt(this.encuestaForm.value.TiempoAproximado!);
    this.encuestaDTO.kmAproximado = parseInt(this.encuestaForm.value.KmAproximado!);
    this.encuestaDTO.transporteId = parseInt(this.encuestaForm.value.TransporteId!);

    console.log(this.encuestaDTO);
    
    this.encuestaService.guardarEncuesta(this.encuestaDTO).subscribe({
      next : (resp : any) => {
        console.log(resp);
        this.router.navigate(["/finalizacion"]);
      },
      error: async (err: { error: any; }) => {
        console.log(err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    });

    this.router.navigate(["/"]);
  }

}

interface encuestaDTO{
  estadoEncuesta : number;
  kmAproximado : number;
  tiempoAproximado : number;
  transporteId : number;
  usuarioId: "x";
}