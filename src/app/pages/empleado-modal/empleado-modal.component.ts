import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.css']
})
export class EmpleadoModalComponent implements OnInit {
  empleadoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empleadoForm = this.fb.group({
      idEmpleado: [{ value: data.empleado?.idEmpleado || '', disabled: true }, Validators.required],
      nombres: [data.empleado?.nombres || '', Validators.required],
      apellidoPaterno: [data.empleado?.apellidoPaterno || '', Validators.required],
      apellidoMaterno: [data.empleado?.apellidoMaterno || '', Validators.required],
      edad: [data.empleado?.edad || '', Validators.required],
      fechaNacimiento: [this.convertirFecha(data.empleado?.fechaNacimiento) || '', Validators.required],
      salario: [data.empleado?.salario || '', Validators.required],
      idUsuario: [data.empleado?.idUsuario || '', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.modo === 'editar' && this.data.empleado?.fechaNacimiento) {
      const fecha = this.convertirFecha(this.data.empleado.fechaNacimiento);
      this.empleadoForm.patchValue({ fechaNacimiento: fecha });
    }
  }

  convertirFecha(fechaArray: number[]): Date | null {
    if (!fechaArray) {
      return null;
    }
    const fecha = new Date(fechaArray[0], fechaArray[1] - 1, fechaArray[2]);
    return fecha;
  }

  onGuardar(): void {
    if (this.empleadoForm.valid) {
      const formData = this.empleadoForm.getRawValue();
      formData.fechaNacimiento = this.formatFechaToString(new Date(formData.fechaNacimiento));
      this.dialogRef.close(formData);
    }
  }

  formatFechaToString(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = '00';
    const minutes = '00';
    const seconds = '00';
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
