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
  editUserModal: boolean;
  registerUserModal: boolean;

  constructor(public usersService: UsuariosService) {
    // this.usersService.getPatients().subscribe((data) => console.log(data));
    this.loading = true;
    this.loadUsers();
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
    this.modalVarsValues(true, false);
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

  modalVarsValues(editUser: boolean, registerUser: boolean) {
    this.editUserModal = editUser;
    this.registerUserModal = registerUser;
  }

  signUpEventHander($event: any) {
    console.log($event);
  }

  logInEventHander($event: any) {
    console.log($event);
  }
}
