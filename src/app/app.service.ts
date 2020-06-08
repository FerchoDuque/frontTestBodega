import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './model/producto.model';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  public addProducto(producto) {
    const url = `http://127.0.0.1:8000/api/bodega`;
    return this.http.post(url, producto);
  }

  public getProductos() {
    const url = `http://127.0.0.1:8000/api/bodega`;
    return this.http.get(url);
  }

  public getProductosByEstado(estado:any) {
    const url = `http://127.0.0.1:8000/api/bodega/listado/`+estado;
    return this.http.get(url);
  }

  public deleteAllProductos() {
    const url = `http://127.0.0.1:8000/api/bodega`;
    return this.http.delete(url);
  }
  
  public deleteProducto(codigo:any) {
    const url = `http://127.0.0.1:8000/api/bodega/accion/`+codigo;
    return this.http.delete(url);
  }
  
  public cambiarEstado(producto:Producto) {
    const url = `http://127.0.0.1:8000/api/bodega/accion/`+producto.codigo;
    return this.http.put(url,producto);
  }
}
