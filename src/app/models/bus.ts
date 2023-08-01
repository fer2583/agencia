import { Modelo } from "./modelo";

export class Bus {
  id: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
  modelo: Modelo


constructor(id: number, patente: string, cantidadAsientos: number, modeloId: number, modelo: Modelo){
  this.id = id;
  this.patente = patente;
  this.cantidadAsientos = cantidadAsientos;
  this.modeloId = modeloId;
  this.modelo = modelo
}
}
