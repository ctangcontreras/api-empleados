import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../servicios/empleado.service';
import { EmpleadoModalComponent } from '../empleado-modal/empleado-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'edad', 'fechaNacimiento', 'salario'];

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarEmpleados();
  }


  private listarEmpleados() {
    this.empleados = [];
    this.empleadoService.getEmpleados().subscribe((result) => {

      this.empleados = result.data;
    }, (err) => {

    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(EmpleadoModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarEmpleados();
      }
    });
  }
}
