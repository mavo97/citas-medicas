import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario-interface';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usersCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<Usuario>('users');
  }

  addUser(user: Usuario, id: string) {
    // const id = this.afs.createId();
    const userToSave: Usuario = { id, ...user };
    return this.usersCollection.doc(id).set(userToSave);
    // return this.usersCollection.add(userToSave);
  }

  getByFilters(correo: string) {
    return (this.usersCollection = this.afs.collection<Usuario>(
      'users',
      (ref) => ref.where('correo', '==', correo)
    ));
  }
}
