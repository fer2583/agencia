import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css']
})


export class BusesListComponent implements OnInit{

displayedColumns: string[] = ["id", "patente", "asientos", "marca", "acciones"]
busList: Bus[]
dataSource: Bus[]
constructor(private busSrv: BusService,
            private modelSrv: ModeloService,
            private router: Router,
            private matSnackBar: MatSnackBar ){

}

ngOnInit(): void {
  this.busSrv.findAll().subscribe(data => {this.busList = data.body.map(
    json=> {
        const bus = new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId, json.modelo)
        this.findModeloColectivo(bus)
        return bus;

      });
      this.dataSource = this.busList;
    })


}

seleccionarColectivo(colectivo:Bus) {
  this.router.navigate(['buses','detail', colectivo.id])
 }

findModeloColectivo(colectivo: Bus){
  this.modelSrv.findOne(colectivo.modeloId).subscribe(data =>{
      colectivo.modelo = new Modelo(data.id, data.nombre, data.marca)
     // console.log(colectivo.modelo)
  })

};

loadColectivo() {
  this.busSrv.findAll().subscribe(
    (res) => {
      if (res.body) {
        this.busList = res.body.map(
          (json) => new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId, json.modelo )
        );
        this.dataSource = this.busList;
      }
    },
    (error) => {
     // console.log("Ocurrió un error. ¡Imposible!");
    }
  );
};

borrarColectivo(colectivo: Bus) {
  this.busSrv.borrar(colectivo.id).subscribe(res => {
    this.matSnackBar.open("Se borro el colectivo correctamente", "Cerrar");
    this.loadColectivo();
  }, error => {
  //  console.log(error);
    this.matSnackBar.open("El Colectivo no se puede eliminar porque ya se encuantra asignado a un Viaje", "Cerrar");
  });
}
}
