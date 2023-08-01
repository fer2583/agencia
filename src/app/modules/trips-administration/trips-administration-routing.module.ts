import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripsDetailComponent } from './trips-detail/trips-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: "full"},
  {path: 'list', component: TripListComponent},
  {path: 'create', component: TripsDetailComponent},
  {path: 'detail/:id', component: TripsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsAdministrationRoutingModule { }
