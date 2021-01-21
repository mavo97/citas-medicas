import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../providers/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public logIn = true;
  public signUp = false;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {}

  formSignUpEventHander($event: any) {
    this.signUp = $event;
    this.signUp === true ? (this.logIn = false) : (this.signUp = true);
  }

  formLogInEventHander($event: any) {
    this.logIn = $event;
    this.logIn === true ? (this.signUp = false) : (this.logIn = true);
  }

  signUpEventHander($event: any) {
    let correo: string = $event.correo;
    let password: string = $event.password;
    console.log(correo, password);
    this.authService.signUp(correo, password);
  }

  logInEventHander($event: any) {
    console.log($event);
    this.authService.signIn($event.correo, $event.password);
  }
}
