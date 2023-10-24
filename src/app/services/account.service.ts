import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient, private router : Router) { }

  register(userCredentials : any){
      this.http.post(`${URL}/api/Account/Register`, userCredentials).subscribe({
        next : resp => {
          console.log(resp);
        },
        error: err => {
          console.log(err);
        }
    });
  }

  loginUser(userCredentials : any){
     return this.http.post(`${URL}/api/account/login`, userCredentials);
  }

  checkToken(){
    let token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(["/"]);
      return; 
    }

    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
    });

    this.http.get(`${URL}/api/account/user`,{headers}).subscribe({
      next: (resp : any)=>{
        if(!resp.ok){
          return resp;
          this.router.navigate(["/"]);
        }

      },
      error: err =>{
        return err;
        this.router.navigate(["/"]);
      }
    })
  }

}