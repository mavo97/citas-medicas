import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public auth: AngularFireAuth) {}
  signUp(email: string, password: string) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: `citasmedicas-4cb55.firebaseapp.com`,
      // This must be true.
      handleCodeInApp: true,
    };
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Sign in with email/password
  signIn(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //  this.router.navigate(['<!-- enter your route name here -->']);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
