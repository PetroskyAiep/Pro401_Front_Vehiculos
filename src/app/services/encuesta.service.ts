import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private http : HttpClient, private router : Router) { }

  getComunas(){
    //console.log(`hola: ${URL}`);
    let respuesta = this.http.get<any>(`${URL}/api/Comuna`);
    return respuesta;
 }

/*  guardarEncuesta(encuesta : any){

  this.http.post(`${URL}/api/Encuesta`, encuesta).subscribe({
    next : resp => {
      console.log(resp);
    },
    error: err => {
      console.log(err);
    }
});
} */

guardarEncuesta(encuesta : any){
  return this.http.post(`${URL}/api/Encuesta`, encuesta);
}
 
}

interface Comuna{
  id: number;
  nombre: string;
}

