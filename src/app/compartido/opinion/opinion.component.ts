// opinion.component.ts
import { Component, OnInit } from '@angular/core';
import { CompartidoService } from '../compartido.service';
import { Opinion } from '../interfaces/opinion';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {
  opiniones: Opinion[] = [];
  currentIndex = 0;
  cards = new Array(20);

  constructor(private compartidoService: CompartidoService) { }

  ngOnInit(): void {
    this.obtenerRankings();
  }

  obtenerRankings(): void {
    this.compartidoService.obtenerRankings().subscribe(opiniones => {
      this.opiniones = opiniones;
      console.log('Opiniones:', this.opiniones);
    });
  }
}
