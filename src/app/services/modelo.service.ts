import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo';
import {catchError, Observable, throwError} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  resourceUrl = environment.backendUrl + 'modelos'

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<Modelo> {
    return this.http.get<Modelo>( this.resourceUrl + '/' + id).pipe(
        catchError(err => {
          console.log(err.message);
          console.log(err);
          return throwError(() => "Ocurrio un problema");
        }),
    );
  }

  findAll(): Observable<any> {
    return this.http.get<Modelo>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(err => {
            console.log("Ocurrio un error");
            return throwError(() => "Paso algo");
          }),
      );
  }
}
