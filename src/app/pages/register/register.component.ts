import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccordionGroupChangeEventDetail } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  constructor(private router : Router, private fb : FormBuilder, private accountService : AccountService) { }

  registerForm = this.fb.group({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$')]),
    confirmPassword : new FormControl('',)
  })

  ngOnInit() {}

  backToLogin(){
    this.router.navigate(["/"]);
  }

  submitForm(){
    console.log("Submit");
    this.accountService.register(this.registerForm.value);
  }

}