import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { BusService } from 'src/app/services/bus.service';
import { TripService } from 'src/app/services/trip.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import { PersonService } from 'src/app/services/person.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { Bus } from 'src/app/models/bus';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

displayedColumns: string[] = ["id", "lugarSalida", "lugarDestino", "fechaSalida","fechaLlegada", "colectivo", "acciones"]
dataSource = [];

selectedTrip: Trip

constructor(private tripSrv: TripService,
            private busSrv: BusService,
            private personSrv: PersonService,
            private router: Router,
            private modeloSrv: ModeloService,
            private matSnackBar:MatSnackBar) {

}

ngOnInit(): void {
  this.loadTrip()

}

loadTrip(){
  this.tripSrv.findAll().subscribe(data => {
    this.dataSource = data.body.map(res =>{
      const trip = new Trip(res.id, res.lugarSalida, res.lugarDestino, res.fechaLlegada, res.fechaSalida, res.idColectivo, res.personaId)
      this.loadColectivo(trip);
      return trip
     })
  })
}

seleccionarViaje(trip:Trip) {
 this.router.navigate(['trips','detail', trip.id])

}

loadColectivo(trip: Trip){
  this.busSrv.findOne(trip.idColectivo).subscribe(data=> {
    trip.colectivo = data.body;
    this.loadModelo(trip.colectivo);

  })
}

borrarViaje(trip: Trip) {
  this.tripSrv.borrar(trip.id).subscribe(res => {
    this.matSnackBar.open("Se borro correctamente el viaje", "Cerrar");
    this.loadTrip();
  }, error => {

    this.matSnackBar.open(error, "Cerrar");
  });
}

loadModelo(colectivo: Bus){
  this.modeloSrv.findOne(colectivo.modeloId).subscribe(data => {
    colectivo.modelo = data;
  })
}


}
