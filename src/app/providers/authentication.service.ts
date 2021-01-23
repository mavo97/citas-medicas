import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Alert } from '../interfaces/alert';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../interfaces/usuario-interface';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  alert: Alert = new Alert();
  userState: any;
  user$: Observable<Usuario>;
  private tipoUser = new BehaviorSubject('');
  messageCurrent = this.tipoUser.asObservable();

  constructor(
    public auth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public userService: UsuariosService,
    private afs: AngularFirestore
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // Sign in with email/password
  signIn(email, password) {
    this.alert.loading();
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.alert.closeLoading();

        this.user$.pipe(take(1)).subscribe((user) => {
          if (user && user.role === 'Admin') {
            this.tipoUser.next('Admin');
            this.router.navigate(['administrador']);
          } else if (user && user.role === 'Paciente') {
            this.tipoUser.next('Paciente');
            this.router.navigate(['paciente']);
          }
        });
      })
      .catch((error) => {
        this.alert.error(error.message);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  logOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['inicio']);
    });
  }

  tipoUsuario() {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user && user.role === 'Admin') {
        this.tipoUser.next('Admin');
      } else if (user && user.role === 'Paciente') {
        this.tipoUser.next('Paciente');
      }
    });
  }
}
