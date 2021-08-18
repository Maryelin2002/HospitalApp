import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
   
  }

  Registrarme(){
    this.router.navigateByUrl("/registro");
  }

  Login(){
    this.router.navigateByUrl("/login");
  }

}