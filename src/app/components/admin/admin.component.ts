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
import { AuthenticationService } from '../../providers/authentication.service';

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
  constructor(
    public usersService: UsuariosService,
    public authService: AuthenticationService
  ) {
    // this.usersService.getPatients().subscribe((data) => console.log(data));
    this.loading = true;
    this.loadUsers();
  }
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
  idUser: string;

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

  ngOnInit(): void {}

  scheduleAppoinment(id: string) {
    console.log(id);
  }

  editUser(user: Usuario) {
    this.isVisible = true;
    this.modalVarsValues(true, false);
    this.idUser = user.id;
  }

  registerUser() {
    this.isVisible = true;
    this.modalVarsValues(false, true);
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
    const newUser: Usuario = { id: this.idUser, ...$event };

    this.usersService
      .editUser(newUser)
      .then(() => {
        this.alert.mostrarAlerta(
          'success',
          'Usuario actualizado correctamente',
          '',
          1000
        );
        this.loadUsers();
      })
      .catch((err) => {
        this.alert.mostrarAlerta(
          'error',
          'No se pudo actualizar el usuario',
          err,
          1000
        );
      });
  }

  logInEventHander($event: any) {
    console.log($event);
    const user: Usuario = { ...$event, role: 'Paciente' };

    this.authService
      .signUp(user.correo, user.password)
      .then((result) => {
        // console.log(result.user);
        delete user.password;

        this.usersService
          .addUser(user, result.user.uid)
          .then(() => {
            this.alert.success(
              'Registro exitoso!',
              'El usuario se encuentra registrado!'
            );
            this.authService.auth.signOut();
          })
          .catch((error) => this.alert.error(error.message));
      })
      .catch((error) => {
        this.alert.error(error.message);
      });
    this.loadUsers();
  }
}
