import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../servicios/empleado.service';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.css']
})
export class EmpleadoModalComponent {
  empleadoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmpleadoModalComponent>,
    private fb: FormBuilder,
    private empleadoService: EmpleadoService
  ) {
    this.empleadoForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      salario: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      this.empleadoService.saveEmpleado(this.empleadoForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
