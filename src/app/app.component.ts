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
      this.productos = response; console.log(response);  
      if(response.length==0)
        this.mensageBodega="Bodega vacía..."; 
    }, error => { 
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }
  
  getProductosByEstado() {  
    this.configService.getProductosByEstado(this.estadoLista).subscribe((response:any)=>{ 
      this.productosEstado = response; 
      if(response.length==0)
        this.mensageBodega="Bodega vacía...";
      else      
        this.clear();
    }, error => { 
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }
  
  deleteAllProductos() {  
    this.configService.deleteAllProductos().subscribe((response:any)=>{ 
      this.mensageBodega="Bodega vacía...";
      this.successMessage = "Bodega Limpia!"; 
      this.successStyle= true;  
      this.productos = [];
    }, error => { 
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }

  cambiarEstado(producto:Producto, estado:any){ 
    producto.estado = estado; 
    this.configService.cambiarEstado(producto).subscribe((response:any)=>{  
      this.successMessage = "Producto "+producto.codigo+" actualizado"; 
      this.successStyle= true;  
      this.getProductos();
    }, error => {  
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }

  borrarProducto(codigo:any){  
    this.clear();
    this.configService.deleteProducto(codigo).subscribe((response:any)=>{  
      this.successMessage = "Producto "+codigo+" eliminado"; 
      this.successStyle= true;  
      this.getProductos();
    }, error => { 
      this.errorMessage = "Error en la petición"; this.errorStyle= true;
    });
  }
}
