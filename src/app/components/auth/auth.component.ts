import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';
import { UsuariosService } from '../../providers/usuarios.service';
import { Usuario } from '../../interfaces/usuario-interface';
import { Alert } from '../../interfaces/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public logIn = true;
  public signUp = false;
  alert: Alert = new Alert();

  constructor(
    public authService: AuthenticationService,
    public userService: UsuariosService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  formSignUpEventHander($event: any) {
    this.signUp = $event;
    this.signUp === true ? (this.logIn = false) : (this.signUp = true);
  }

  formLogInEventHander($event: any) {
    this.logIn = $event;
    this.logIn === true ? (this.signUp = false) : (this.logIn = true);
  }

  signUpEventHander($event: Usuario) {
    const user: Usuario = { ...$event, role: 'Paciente' };

    this.authService
      .signUp(user.correo, user.password)
      .then((result) => {
        // console.log(result.user);
        delete user.password;

        this.userService
          .addUser(user, result.user.uid)
          .then(() => {
            this.alert.success(
              'Registro exitoso!',
              'Tú correo se encuentra registrado!'
            );
            this.authService.auth.signOut();
          })
          .catch((error) => this.alert.error(error.message));
      })
      .catch((error) => {
        this.alert.error(error.message);
      });
  }

  logInEventHander($event: any) {
    this.authService.signIn($event.correo, $event.password);
    if ($event.remember) {
      localStorage.setItem('correo', $event.correo);
    } else {
      localStorage.removeItem('correo');
    }
  }
}
