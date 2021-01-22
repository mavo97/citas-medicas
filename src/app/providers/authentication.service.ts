import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Alert } from '../interfaces/alert';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  alert: Alert = new Alert();

  constructor(public auth: AngularFireAuth) {}
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // Sign in with email/password
  signIn(email, password) {
    this.alert.loading();
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //  this.router.navigate(['<!-- enter your route name here -->']);
        console.log(result.user);
      })
      .catch((error) => {
        this.alert.error(error.message);
      });
  }
}
