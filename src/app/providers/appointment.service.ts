import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Appointment } from '../interfaces/appointment-interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsCollection: AngularFirestoreCollection<Appointment>;

  constructor(private afs: AngularFirestore) {
    this.appointmentsCollection = afs.collection<Appointment>('appointments');
  }

  addAppointment(appointment: Appointment) {
    const id = this.afs.createId();
    const appointmentToSave: Appointment = { id, ...appointment };
    return this.appointmentsCollection.doc(id).set(appointmentToSave);
  }

  getAppointments() {
    return this.afs.collection<Appointment>('appointments').valueChanges();
  }

  savedAppointments() {
    return this.afs
      .collection<Appointment[]>('appointments')
      .snapshotChanges()
      .pipe(
        map((appointments) =>
          appointments.map((a) => {
            const data = a.payload.doc.data(); // DB Questions
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getAppointmentByPatient(idUser: string) {
    return this.afs
      .collection<Appointment>('appointments', (ref) =>
        ref.where('idUser', '==', idUser)
      )
      .valueChanges();
  }
}
