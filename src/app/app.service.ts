import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './model/producto.model';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {}

  public addProducto(producto) {
    const url = `http://127.0.0.1:8080/api/bodega`;
    return this.http.post(url, producto);
  }

  public getProductos() {
    const url = `http://127.0.0.1:8080/api/bodega`;
    return this.http.get(url);
  }

  public getProductosByEstado(estado) {
    const url = `http://127.0.0.1:8080/api/bodega/`+estado;
    return this.http.get(url);
  }
}
