import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario-interface';
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

  addUser(user: Usuario) {
    const id = this.afs.createId();
    const userToSave: Usuario = { id, ...user };
    // this.usersCollection.doc(id).set(item);
    return this.usersCollection.add(userToSave);
  }
}
