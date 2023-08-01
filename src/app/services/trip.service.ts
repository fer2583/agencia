import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  resourceUrl = environment.backendUrl + "viajes"
  constructor(private http: HttpClient) {

   }
   findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(err => {
            console.log("Ocurrio un error");
            return throwError(() => "Paso algo");
          }),
    )};

    findOne(id: number): Observable<Trip> {
      return this.http.get<Trip>( this.resourceUrl + '/' + id).pipe(
          catchError(err => {
            console.log("Ocurrio un error: ");
            console.log(err);
            return throwError(() => "No existe el Viaje");
          }),
      );
    }

  crearViaje(trip: tripDTO): Observable<any>{
    return this.http.post<any>(this.resourceUrl, trip).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear viaje");
      }),
    )
  }

  actualizarViaje(trip: tripDTO): Observable<any>{
    return this.http.put<any>(this.resourceUrl+ '/' + trip.id, trip).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo actualizar viaje con id" + trip.id);
      }),
    )
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el viaje");
      }),
    );
  }

}

export interface tripDTO {
  id?: number
  lugarSalida: string
  lugarDestino: string
  fechaLlegada: Date
  fechaSalida: Date
  personaId: number[]
  idColectivo: number
}
