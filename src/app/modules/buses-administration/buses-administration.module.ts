import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import { BusesListComponent } from "./buses-list/buses-list.component";
import { BusesDetailComponent } from './buses-detail/buses-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [BusesListComponent, BusesDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    ReactiveFormsModule, MatFormFieldModule,
    BusesAdministrationRoutingModule
  ]
})
export class BusesAdministrationModule { }
