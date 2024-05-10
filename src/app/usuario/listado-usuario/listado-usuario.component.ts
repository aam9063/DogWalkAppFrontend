import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../Interfaces/usuario';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    'username',
    'apellidos',
    'nombres',
    'email',
    'rol'
  ];
  usuarios: Usuario[] = [];
  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _usuarioServicio: UsuarioService,
    private _compartidoServicio: CompartidoService,
    private dialog: MatDialog
  ) {}

  obtenerUsuarios() {
    this._usuarioServicio.obtenerUsuarios().subscribe(
      usuarios => {
        this.dataSource = new MatTableDataSource(usuarios);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Error al obtener usuarios:', error);
        this._compartidoServicio.mostrarAlerta('Error al obtener usuarios', 'Error!');
      }
    );
  }

  nuevoUsuario() {
    this.dialog
      .open(ModalUsuarioComponent, {disableClose: false, width: '100%', height: '100%'})
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerUsuarios();
      })
  }

  aplicarFiltroListado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

}
