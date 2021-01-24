import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario-interface';
import { UsuariosService } from '../../providers/usuarios.service';
import { take } from 'rxjs/operators';
import {
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { Alert } from 'src/app/interfaces/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder | null;
  sortFn?: NzTableSortFn | null;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  users: Usuario[];
  loading: boolean;
  alert: Alert = new Alert();
  isVisible = false;
  isConfirmLoading = false;
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.value);
  }

  constructor(public usersService: UsuariosService, private fb: FormBuilder) {
    // this.usersService.getPatients().subscribe((data) => console.log(data));
    this.loading = true;
    this.loadUsers();
    this.initializeForm();
  }

  ngOnInit(): void {}

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: Usuario, b: Usuario) => a.name.localeCompare(b.name),
    },
    {
      name: 'Apellidos',
      sortOrder: null,
      sortFn: (a: Usuario, b: Usuario) => a.lastname.localeCompare(b.lastname),
    },
    {
      name: 'Correo',
    },
    {
      name: 'Número de télefono',
    },
    {
      name: 'Acciónes',
    },
  ];

  scheduleAppoinment(id: string) {
    console.log(id);
  }

  editUser(id: string) {
    this.isVisible = true;
  }
  deleteUser(user: Usuario) {
    this.alert.confirmAlert().then((result) => {
      if (result.isConfirmed) {
        this.usersService
          .deleteUser(user)
          .then(() => {
            this.alert.mostrarAlerta('success', 'Usuario eliminado!', '', 1000);
            this.loadUsers();
          })
          .catch(() => {
            this.alert.mostrarAlerta(
              'error',
              'Error al eliminar usuario!',
              '',
              1000
            );
          });
      }
    });
  }

  loadUsers() {
    this.usersService
      .getPatients()
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  initializeForm() {
    return (this.validateForm = this.fb.group({
      correo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cellphonenumber: ['', [Validators.required]],
    }));
  }
}
