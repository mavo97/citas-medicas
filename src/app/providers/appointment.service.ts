import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
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
}
