import { Component, OnInit } from '@angular/core';
import { CompartidoService } from '../compartido.service';
import { Perro } from '../interfaces/perro';
import { RankingPerro } from '../interfaces/RankingPerro';
import { CrearOpiPerro } from '../interfaces/CrearOpiPerro';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-rrss',
  templateUrl: './rrss.component.html',
  styleUrls: ['./rrss.component.css']
})
export class RrssComponent implements OnInit{
  perros: Perro[] = [];
  currentIndex = 0;
  cards = new Array(9);
  displayedColumns: string[] = ['nombrePaseador', 'nombrePerro', 'comentario', 'puntuacion'];
  opiniones: RankingPerro[] = [];
  dataSource = new MatTableDataSource<RankingPerro>(this.opiniones);
  opinionForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private compartidoService: CompartidoService) {
    this.opinionForm = this.formBuilder.group({
      nombrePaseador: '',
      nombrePerro: '',
      comentario: '',
      puntuacion: ''
    });
  }
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    this.obtenerPerros();
    this.obtenerOpiniones();
  }

  obtenerPerros(): void {
    this.compartidoService.obtenerPerros().subscribe(perros => {
      this.perros = perros;
      console.log('Perros:', this.perros);
    });
  }

  nextCard() {
    if (this.currentIndex < this.perros.length - 1) {
      this.currentIndex++;
    }
  }

  previousCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  obtenerOpiniones(): void {
  this.compartidoService.obtenerOpiniones().subscribe(opiniones => {
    this.opiniones = opiniones;
    this.dataSource = new MatTableDataSource<RankingPerro>(this.opiniones);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  });
  }

  enviarOpinion(): void {
    const opPerro: CrearOpiPerro = this.opinionForm.value;
    this.compartidoService.crearOpPerro(opPerro).subscribe(response => {
      console.log('Opinión enviada:', response);
      alert('Opinión enviada');
      this.opinionForm.reset();
    }, error => {
      console.error('Error al enviar la opinión:', error);
    });
  }


}
