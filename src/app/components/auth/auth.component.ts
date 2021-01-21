import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public logIn = true;
  public signUp = false;

  constructor() {}

  ngOnInit(): void {}

  formSignUpEventHander($event: any) {
    this.signUp = $event;
    this.signUp === true ? (this.logIn = false) : (this.signUp = true);
  }

  formLogInEventHander($event: any) {
    this.logIn = $event;
    this.logIn === true ? (this.signUp = false) : (this.logIn = true);
  }
}
