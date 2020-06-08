import { Component, OnInit } from '@angular/core';
import { Producto } from './model/producto.model';
import { ConfigService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'frontTestBodega';

  producto = new Producto();
  productos : Producto[];
  productosEstado : Producto[];

  errorStyle:boolean;
  successStyle:boolean;
  errorMessage:string;
  successMessage:string;
  mensageBodega:string;
  mensageBodegaEstado:string;

  estadoLista:string;

  estadoProducto = [
    { id: 'E', label: "Entrada" },
    { id: 'S', label: "Salida" },
    { id: 'D', label: "Defectuoso" }
  ];

  constructor(public configService:ConfigService) {}

  ngOnInit() {
    this.getProductos();
  }

  clear(){
    this.successStyle= false;
    this.successStyle= false;  
    this.successMessage = ""; 
    this.errorMessage = "";
    this.mensageBodega="";
  }

  addProducto() {
    this.clear();
    if(!this.producto.codigo && !this.producto.nombre && !this.producto.estado){
      this.errorMessage = "Ingresa todos los campos!"; this.errorStyle= true;
    }else{
      this.configService.addProducto(this.producto).subscribe((response:any)=>{ 
        this.successMessage = "Producto creado correctamente!"; 
        this.successStyle= true; 
        this.getProductos();
      }, error => {
        this.errorMessage = "El Producto ya existe!"; this.errorStyle= true;
      });
    }
  }

  getProductos() {  
    this.configService.getProductos().subscribe((response:any)=>{ 
      this.productos = response; console.log(this.productos);  
      if(response.length==0)
        this.mensageBodega="Bodega vacía...";
      else      
        this.clear();
    }, error => {
      console.log(error);
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }
  
  getProductosByEstado() {  
    this.configService.getProductosByEstado(this.estadoLista).subscribe((response:any)=>{ 
      this.productosEstado = response; console.log(this.productosEstado);  
      if(response.length==0)
        this.mensageBodega="Bodega vacía...";
      else      
        this.clear();
    }, error => {
      console.log(error);
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }

}
