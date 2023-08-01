import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bus } from 'src/app/models/bus';
import { Modelo } from 'src/app/models/modelo';
import { Person } from 'src/app/models/person';
import { Trip } from 'src/app/models/trip';
import { BusService } from 'src/app/services/bus.service';
import { ModeloService } from 'src/app/services/modelo.service';
import { PersonService } from 'src/app/services/person.service';
import { TripService, tripDTO } from 'src/app/services/trip.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trips-detail',
  templateUrl: './trips-detail.component.html',
  styleUrls: ['./trips-detail.component.css']
})
export class TripsDetailComponent implements OnInit{

  tripForm = this.fb.group({
    origen: ["", Validators.required],
    destino: ["", Validators.required],
    fechaSalida: [new Date(), Validators.required],
    fechaLlegada: [new Date(), Validators.required],
    colectivo: [0, Validators.required],
    pasajeros: [[0], Validators.required]
  })

  busList: Bus[] = [];
  personList: Person[] = [];
  selectedTrip: Trip | null = null

  constructor(private fb: FormBuilder,
              private busSrv: BusService,
              private matSnackBar: MatSnackBar,
              private modelSrv: ModeloService,
              private router: Router, private route: ActivatedRoute,
              private personSrv: PersonService,
              private tripSrv: TripService ){

              }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
     // console.log("El id que estoy esditando es " + id);
      if(id){
        this.findTrip(Number(id))
      }
    });

    this.loadColectivo(this.selectedTrip)
    this.busSrv.findAll().subscribe(data => {this.busList = data.body.map(
      json=> {
          const bus = new Bus(json.id, json.patente, json.cantidadAsientos, json.modeloId, json.modelo)
          this.findModeloColectivo(bus)
          return bus;
        })
      },
      error => {
   //    console.log(error);
        this.matSnackBar.open(error, "cerrar")
      })
    this.personSrv.findAll().subscribe(data =>{
      this.personList = data.body.map(json=> new Person(json.id, json.age, json.name, json.lastName))
    })
    };

    findTrip(id: number) {
      this.tripSrv.findOne(id).subscribe(res => {
       this.selectedTrip = res;
          this.tripForm.patchValue({
            origen: res.lugarSalida,
            destino: res.lugarDestino,
            fechaSalida: new Date(res.fechaSalida),
            fechaLlegada: new Date(res.fechaLlegada),
            colectivo: res.idColectivo,
            pasajeros: res.personaId,

          })
        },
       error => {
   //     console.log(error);
        this.matSnackBar.open(error, "Cerrar");
        this.router.navigate(['trips', 'list']);
      });
    }


      findModeloColectivo(colectivo: Bus){
        this.modelSrv.findOne(colectivo.modeloId).subscribe(data =>{
            colectivo.modelo = new Modelo(data.id, data.nombre, data.marca)
     //       console.log(colectivo.modelo)
        })

      };

      loadColectivo(trip: Trip) {
        if (trip && trip.colectivo) { // Verificar si trip y colectivo están definidos
          this.busSrv.findOne(trip.colectivo.id).subscribe(data => {
            trip.colectivo = data.body;

          });
        }
      }

      guardarCambios() {
        const pasajeros: number[] = this.tripForm.get('pasajeros').value;

        const body: tripDTO = {
          lugarSalida: this.tripForm.get('origen').value,
          lugarDestino: this.tripForm.get('destino').value,
          fechaLlegada: this.tripForm.get('fechaLlegada').value,
          fechaSalida: this.tripForm.get('fechaSalida').value,
          personaId: pasajeros,
          idColectivo: this.tripForm.get('colectivo').value,
        }

        if (this.selectedTrip && this.selectedTrip.id) {
          // LLamar al metodo actualizar
     //     console.log("Actualizando un Viaje");

          body.id = this.selectedTrip.id;

          this.tripSrv.actualizarViaje(body).subscribe(res => {
            this.matSnackBar.open("Se guardaron los cambios del viaje", "Cerrar");
            this.router.navigate(['trips', 'list']);
          }, error => {
        //    console.log(error);
            this.matSnackBar.open(error, "Cerrar");
          });
        }
        else {
          this.tripSrv.crearViaje(body).subscribe(res => {
            this.matSnackBar.open("Se creo el viaje correctamente", "Cerrar");
            this.router.navigate(['trips', 'list']);
          }, error => {
      //      console.log(error);
            this.matSnackBar.open(error, "Cerrar");
          });
        }
      }

  }



