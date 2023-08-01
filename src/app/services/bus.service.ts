import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  resourceUrl = environment.backendUrl + "colectivos"
  constructor(private http: HttpClient) {

   }
   findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(err => {
            console.log("Ocurrio un error");
            return throwError(() => "Paso algo");
          }),
      );
  }

  findOne(id: number): Observable<HttpResponse<Bus>> {
    return this.http.get<Bus>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
        catchError(err => {
          console.log("Ocurrio un error: ");
          console.log(err);
          return throwError(() => "No existe el colectivo");
        }),
    );
  };

  crearColectivo(colectivo: Bus): Observable<any>{
    return this.http.post<any>(this.resourceUrl, colectivo).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear Colectivo");
      }),
    )
  };

  actualizarColectivo(colectivo: Bus): Observable<any>{
    return this.http.put<any>(this.resourceUrl+ '/' + colectivo.id, colectivo).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo actualizar viaje con id" + colectivo.id);
      }),
    )
  };

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el colectivo");
      }),
    );
  }

}
