import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompartidoService } from '../compartido.service';
import { Paseador } from '../interfaces/paseador';
import { Horario } from '../interfaces/horario';
import { Servicio } from '../interfaces/servicio';

interface Reserva {
  servicio: string;
  paseador: string;
  fechaHora: string;
}


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  form = this.fb.group({
    servicio: ['', Validators.required],
    paseador: ['', Validators.required],
    fechaHora: ['', Validators.required]
  });

  displayedColumns: string[] = ['servicio', 'paseador', 'fechaHora', 'acciones'];

  servicios: Servicio[] = [];
  paseadores: Paseador[] = [];
  horarios: Horario[] = [];
  reservasSeleccionadas: Reserva[] = [];

  constructor(
    private fb: FormBuilder,
    private compartidoService: CompartidoService,
  ) {}

  ngOnInit() {
    this.compartidoService.obtenerPaseadores().subscribe(paseadores => {
      console.log(paseadores);
      this.paseadores = paseadores;
    });

    this.compartidoService.obtenerServicios().subscribe(servicios => {
      console.log(servicios);
      this.servicios = servicios;
    });

    this.compartidoService.obtenerHorarios().subscribe(horarios => {
      console.log(horarios);
      this.horarios = horarios;
    });

    const reservasGuardadas = localStorage.getItem('reservas');
  if (reservasGuardadas) {
    this.reservasSeleccionadas = JSON.parse(reservasGuardadas);
  }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { servicio, paseador, fechaHora } = this.form.value;
      alert('Reserva realizada con éxito')

      if (servicio && paseador && fechaHora) {
        this.reservasSeleccionadas = [...this.reservasSeleccionadas, { servicio, paseador, fechaHora }];
        localStorage.setItem('reservas', JSON.stringify(this.reservasSeleccionadas));
      }

      this.form.reset({ servicio: '', paseador: '', fechaHora: '' });
    }
  }

  modificarReserva(event: Event, reserva: Reserva): void {
    event.preventDefault();
    const { servicio, paseador, fechaHora } = reserva;
    this.form.setValue({ servicio, paseador, fechaHora });
  }

  eliminarReserva(event: Event, reserva: Reserva): void {
    event.preventDefault();
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta reserva?');
    if (confirmacion) {
      this.reservasSeleccionadas = this.reservasSeleccionadas.filter(r => r !== reserva);
      localStorage.setItem('reservas', JSON.stringify(this.reservasSeleccionadas));
    }
  }


}
