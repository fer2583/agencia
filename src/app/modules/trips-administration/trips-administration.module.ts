import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { TripsAdministrationRoutingModule } from './trips-administration-routing.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { MatIconModule } from '@angular/material/icon';
import { TripsDetailComponent } from './trips-detail/trips-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TripListComponent,
    TripsDetailComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    TripsAdministrationRoutingModule
  ]
})
export class TripsAdministrationModule { }
