import { Component, OnInit, ViewChild } from '@angular/core';
import { CompartidoService } from '../compartido.service';
import { Precio } from '../interfaces/precio';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})
export class PrecioComponent implements OnInit {
  displayedColumns: string[] = ['nombrePaseador', 'nombreServicio', 'precio'];
  dataSource = new MatTableDataSource<Precio>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private compartidoService: CompartidoService) { }

  ngOnInit(): void {
    this.compartidoService.obtenerPrecios().subscribe(
      precios => {
        this.dataSource.data = precios;
        console.log('Precios: ', precios);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error al obtener precios:', error);
      }
    );
  }
}
