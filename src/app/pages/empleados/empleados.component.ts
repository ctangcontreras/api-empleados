import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../../servicios/empleado.service';
import { EmpleadoModalComponent } from '../empleado-modal/empleado-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteModalComponent } from 'src/app/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nombres', 'apellidos', 'edad', 'fechaNacimiento', 'salario', 'opciones'];

  constructor(private empleadoService: EmpleadoService, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  private listarEmpleados() {
    this.empleadoService.getEmpleados().subscribe((result) => {
      this.empleados.data = result.data;
    }, (err) => {
      console.error(err);
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(EmpleadoModalComponent, {
      width: '400px',
      data: { modo: 'crear' }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.empleadoService.saveEmpleado(resultado).subscribe(() => {
          this.listarEmpleados();
          this.toastr.success('Empleado registrado exitosamente', 'Éxito');
        });
      }
    });
  }

  abrirModalEditar(id: number): void {
    this.empleadoService.getEmpleadoById(id).subscribe((result) => {
      const dialogRef = this.dialog.open(EmpleadoModalComponent, {
        width: '400px',
        data: { modo: 'editar', empleado: result.data }
      });

      dialogRef.afterClosed().subscribe(empleadoActualizado => {
        if (empleadoActualizado) {
          this.empleadoService.updateEmpleado(empleadoActualizado).subscribe(() => {
            this.listarEmpleados();
            this.toastr.success('Empleado actualizado exitosamente', 'Éxito');
          });
        }
      });
    });
  }

  abrirModalEliminar(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '300px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoService.deleteEmpleado(id).subscribe(() => {
          this.listarEmpleados();
          this.toastr.success('Empleado eliminado exitosamente', 'Éxito');
        });
      }
    });
  }
}
