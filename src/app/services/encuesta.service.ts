import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getEncuesta(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    const options = { headers: headers };
    console.log(options);
    return this.http.get<any>(`${URL}/api/Encuesta`, options);
  }

  guardarEncuesta(encuesta : any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });
    const options = { headers: headers };
    console.log(options);
    return this.http.post(`${URL}/api/Encuesta`, encuesta, options);
  }
 
}

