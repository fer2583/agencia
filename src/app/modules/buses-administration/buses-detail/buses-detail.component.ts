import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModeloService } from 'src/app/services/modelo.service';
import { Modelo } from 'src/app/models/modelo';

@Component({
  selector: 'app-buses-detail',
  templateUrl: './buses-detail.component.html',
  styleUrls: ['./buses-detail.component.css']
})
export class BusesDetailComponent implements OnInit{

  selectedBus: Bus | null = null;
  modelos: Modelo[] = [];
  busForm: FormGroup = this.fb.group({
    id: ["", Validators.required],
    patente: ["", Validators.required],
    cantidadAsiento: ["", Validators.required],
    modeloId: ['', Validators.required],

  })

  constructor(private busSrv: BusService,
              private modeloSrv: ModeloService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,){}

ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
     // console.log("El id que estoy editando es: " + id);
      if(id){
        this.findBus(Number(id));
      }
    });

    this.loadMarca();

  }

findBus(idColectivo){
  this.busSrv.findOne(idColectivo).subscribe(res=> {
    this.selectedBus = res.body;
    this.busForm.patchValue({
      id: res.body.id,
      patente: res.body.patente,
      cantidadAsiento: res.body.cantidadAsientos,
      modeloId: res.body.modeloId,
     // modelos: this.modelos
    })
  })
};

guardarCambios(): void {
  const modeloId: number = this.busForm.get('modeloId').value;
  const modelo: Modelo | undefined = this.modelos.find(m => m.id === modeloId);

  const body: Bus = {
    id: this.busForm.get('id').value,
    patente: this.busForm.get('patente').value,
    cantidadAsientos: this.busForm.get('cantidadAsiento').value,
    modeloId: modeloId,
    modelo: modelo
  };

  if (this.selectedBus && this.selectedBus.id) {
    // Llamar al método actualizar
   // console.log("Actualizando un Colectivo");

    this.busSrv.actualizarColectivo(body).subscribe(res => {
      this.matSnackBar.open("Se guardaron los cambios del Colectivo", "Cerrar");
      this.router.navigate(['buses', 'list']);
    }, error => {
     // console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  } else {
    this.busSrv.crearColectivo(body).subscribe(res => {
      this.matSnackBar.open("Se creó el Colectivo correctamente", "Cerrar");
      this.router.navigate(['buses', 'list']);
    }, error => {
     // console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }
}
  loadMarca(){
    this.modeloSrv.findAll().subscribe(data => {
      this.modelos = data.body;
      console.log(this.modelos)
    },
    (error)=> {console.log("Error al obtener las Marcas",error)}
    )
  }
}
