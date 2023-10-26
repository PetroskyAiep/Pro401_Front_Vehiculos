import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { min } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { environment } from 'src/environments/environment';

const minEdad = environment.minEdad * environment.yearTimeStampValue;
const maxEdad = environment.maxEdad * environment.yearTimeStampValue;

export function matchPasswordValidator(passwordKey : string, confirmPasswordKey : string) : ValidatorFn{
  return (control : AbstractControl) : {[key : string] : any} | null => {

    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password === confirmPassword ? null : {passwordMismatch : true};
  }
}

export function validarEdad(dateKey : string) : ValidatorFn{
  return (control : AbstractControl) : {[key : string] : any} | null => {
    const fecha = Date.parse(control.get(dateKey)?.value);
    const currentDate = new Date();
    const currentDateInt = Date.parse(currentDate.toString());
    const edad = currentDateInt - fecha;
    return currentDateInt > fecha && maxEdad > edad ? null : {edadInvalida : true};
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  comunas : any[] =[{id: 1, nombre: "Santiago"},{id: 2, nombre: "Providencia"},{id: 3, nombre: "Las Condes"}];
  currentDate = new Date();
  registroDTO : registroDTO = {
    Email : "",
    Password : "",
    Run : "",
    Nombres : "",
    Apellidos : "",
    FechaNacimiento : new Date(),
    TipoTrabajoId : 0,
    ComunaTrabajoId : 0,
    ComunaResidenciaId : 0,
    EstadoRegistroId : 0,
  };

  constructor(private router : Router, private fb : FormBuilder, private accountService : AccountService, private encuestaService : EncuestaService) { }

  registerForm = this.fb.group({
    Email  : new FormControl('', [Validators.required,Validators.email]),
    Password  : new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$')]),
    confirmPassword : new FormControl(''),
    Run : new FormControl('', [Validators.required, Validators.pattern('^[0-9]+-[0-9kK]{1}$')]),
    Nombres : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    Apellidos : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    FechaNacimiento : new FormControl('', [Validators.required]),
    TipoTrabajoId : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    ComunaTrabajoId : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    ComunaResidenciaId : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  },
  {
    validator : [matchPasswordValidator('Password', 'confirmPassword'), validarEdad('FechaNacimiento')]
  });



  ngOnInit() {
    this.encuestaService.getComunas().subscribe(response => {
      this.comunas = response;
      });
  }

  backToLogin(){
    this.router.navigate(["/"]);
  }

  submitForm(){
/*     const Edad = Date.parse(this.registerForm.value.FechaNacimiento);
    const 
 */
    this.registroDTO.Email = this.registerForm.value.Email;
    this.registroDTO.Password = this.registerForm.value.Password;
    this.registroDTO.Run = this.registerForm.value.Run;
    this.registroDTO.Nombres = this.registerForm.value.Nombres;
    this.registroDTO.Apellidos = this.registerForm.value.Apellidos;
    this.registroDTO.FechaNacimiento = new Date(this.registerForm.value.FechaNacimiento);
    this.registroDTO.TipoTrabajoId = Number(this.registerForm.value.TipoTrabajoId);
    this.registroDTO.ComunaTrabajoId = Number(this.registerForm.value.ComunaTrabajoId);
    this.registroDTO.ComunaResidenciaId = Number(this.registerForm.value.ComunaResidenciaId);
  /*   if(this.FechaNacimiento < minAge){
      this.registroDTO.ComunaTrabajoId = 0;
    } */
    this.registroDTO.EstadoRegistroId = 1;
    console.log(this.registroDTO);
    this.accountService.register(this.registroDTO);
    this.router.navigate(["/"]);
  }
}

interface registroDTO{
  Email : string;
  Password : string;
  Run : string;
  Nombres : string;
  Apellidos : string;
  FechaNacimiento : Date;
  TipoTrabajoId : number;
  ComunaTrabajoId : number;
  ComunaResidenciaId : number;
  EstadoRegistroId : number;
}
