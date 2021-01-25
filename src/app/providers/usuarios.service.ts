import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario-interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private usersCollection: AngularFirestoreCollection<Usuario>;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.usersCollection = afs.collection<Usuario>('users');
  }

  addUser(user: Usuario, id: string) {
    // const id = this.afs.createId();
    const userToSave: Usuario = { id, ...user };
    return this.usersCollection.doc(id).set(userToSave);
    // return this.usersCollection.add(userToSave);
  }

  editUser(user: Usuario) {
    return this.usersCollection.doc(user.id).update(user);
  }

  deleteUser(user: Usuario) {
    return this.usersCollection.doc(user.id).delete();
  }

  getByFilters(correo: string) {
    return (this.usersCollection = this.afs.collection<Usuario>(
      'users',
      (ref) => ref.where('correo', '==', correo)
    ));
  }

  getPatients() {
    return this.afs
      .collection<Usuario>('users', (ref) =>
        ref.where('role', '==', 'Paciente')
      )
      .valueChanges();
  }

  getPatientsById(id: string) {
    return this.afs
      .collection<Usuario>('users', (ref) => ref.where('id', '==', id))
      .valueChanges();
  }
}
