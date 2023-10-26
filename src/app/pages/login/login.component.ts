import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncuestaService } from '@app/services/encuesta.service';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  encuesta : any;

  constructor(
    private router : Router, 
    private fb : FormBuilder, 
    private accountService : AccountService,
    private encuestaService : EncuestaService,
    private alertController : AlertController
    ){ }

  loginForm = this.fb.group({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$')])
  });

  ngOnInit() {}

  toRegister() {
    //console.log("toRegister");
    this.router.navigate(["registro"]);
  }

  toRecuperacion() {
    this.router.navigate(["recuperacion"]);
  }
  
  toQr(){
    this.router.navigate(["/lectorqr"]);
  }

  submitLoginForm(){
    console.log("SubmitLoginForm");
    this.accountService.loginUser(this.loginForm.value).subscribe({
      next : (resp : any) => {
        console.log(resp);
        localStorage.setItem("token", resp["token"]);

        
        this.encuestaService.getEncuesta().subscribe({
          next : (resp : any) => {
            console.log(resp);
            this.encuesta = resp;
            console.log(this.encuesta.estadoEncuesta);
            this.encuesta.estadoEncuesta == 1? this.router.navigate(["/finalizacion"]) : this.router.navigate(["/encuesta"]);
          },
          error:  err => {
            console.log(err);
            this.router.navigate(["/encuesta"]);
          }
        });
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
  };
}


