import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizacion',
  templateUrl: './finalizacion.component.html',
  styleUrls: ['./finalizacion.component.scss'],
})
export class FinalizacionComponent  implements OnInit {


  constructor(private router : Router) { }

  ngOnInit() {}

  invocarPost(){
    this.router.navigate(["/"]);
  }

}
