import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidoService } from '../compartido.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent {
  benefits = [
    { title: 'Cobertura Veterinaria', description: 'Hasta 500€ de cobertura veterinaria en caso de accidente durante una reserva.', isOpen: false, icon: 'local_hospital', color: 'white', fontSize: '20px' },
    { title: 'Cancelación Gratuita', description: 'Cada reserva de Gudog incluye cancelación gratuita, garantizando un reembolso completo para cualquier cancelación realizada hasta 3 días antes del inicio de una reserva.', isOpen: false, icon: 'cancel', color: 'white', fontSize: '20px' },
    { title: 'Cuidadores verificados', description: 'Cada cuidador de perros de Gudog ha pasado por una rigurosa evaluación y aprobación por parte de nuestro equipo.', isOpen: false, icon: 'verified', color: 'white', fontSize: '20px' },
    { title: 'Soporte y Ayuda', description: 'Contáctanos a través de nuestro chat de soporte o envíanos un correo electrónico, ¡estamos encantados/as de ayudarte y responderemos lo más pronto posible!', isOpen: false, icon: 'help', color: 'white', fontSize: '20px' },
    { title: 'Pagos seguros', description: 'Todos los pagos procesados a través de la web o la aplicación de Gudog son seguros. Retenemos de forma segura tus fondos hasta que se completa la reserva, y luego los transferimos al cuidador/a.', isOpen: false, icon: 'payment', color: 'white', fontSize: '20px' },
  ];

  constructor(private router: Router, private compartidoService: CompartidoService) { }

}
