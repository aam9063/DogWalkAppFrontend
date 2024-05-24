import { Component, OnInit } from '@angular/core';
import { CompartidoService } from '../compartido.service';
import { Perro } from '../interfaces/perro';

@Component({
  selector: 'app-rrss',
  templateUrl: './rrss.component.html',
  styleUrls: ['./rrss.component.css']
})
export class RrssComponent {
  perros: Perro[] = [];
  currentIndex = 0;
  cards = new Array(9);

  constructor(private compartidoService: CompartidoService) { }

  ngOnInit(): void {
    this.obtenerPerros();
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

}
