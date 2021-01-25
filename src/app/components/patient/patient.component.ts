import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../providers/usuarios.service';
import { Usuario } from '../../interfaces/usuario-interface';
import { take } from 'rxjs/operators';
import { AppointmentService } from '../../providers/appointment.service';
import { Appointment } from 'src/app/interfaces/appointment-interface';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  usuario: Usuario;
  appointments: Appointment[];
  constructor(
    private userService: UsuariosService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    this.getUser(userStorage);
    this.appointmentService
      .getAppointmentByPatient(userStorage.uid)
      .pipe(take(1))
      .subscribe(
        (appointments) =>
          (this.appointments = appointments.map((appointment) => {
            return {
              ...appointment,
              startDate: this.toDateTime(appointment.startDate),
              endDate: this.toDateTime(appointment.endDate),
            };
          }))
      );
  }

  getUser(userStorage: any) {
    this.userService
      .getPatientsById(userStorage.uid)
      .pipe(take(1))
      .subscribe((user) => (this.usuario = user[0]));
  }

  toDateTime(secs) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }
}
