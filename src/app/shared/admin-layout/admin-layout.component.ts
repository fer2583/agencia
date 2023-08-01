import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  animations: [
    trigger('openClose', [
      state('closed', style({
        width: '70px',
      })),
      state('open', style({
        width: '200px',
      })),

      transition('* => closed', [
        animate('0.1s')
      ]),
      transition('* => open', [
        animate('0.1s')
      ]),
    ])
  ]
})
export class AdminLayoutComponent implements OnInit{

  isExpanded = false;
  mensajeBienvenida: string = "Bienvenido a Administracion de Pasajeros"

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualizarMensajeBienvenida(event.url);
      }
    });
  };

  actualizarMensajeBienvenida(url: string): void {
    // Obtener el mensaje de bienvenida en función de la URL actual
    if (url.includes('/person')) {
      this.mensajeBienvenida = 'Bienvenido a Administración de Pasajeros';
    } else if (url.includes('/buses')) {
      this.mensajeBienvenida = 'Bienvenido a Administración de Colectivos';
    } else {
      this.mensajeBienvenida = 'Bienvenido a Administracion de Viajes';
    }
  }

  onExpandedPress(expanded: boolean) {
    this.isExpanded = expanded;
  }
}
