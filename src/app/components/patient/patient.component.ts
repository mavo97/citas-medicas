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
  appointments: any[];
  loading: boolean;
  isVisibleTop = false;

  constructor(
    private userService: UsuariosService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const userStorage = JSON.parse(localStorage.getItem('user'));
    this.getUser(userStorage);
    this.appointmentService
      .getAppointmentByPatient(userStorage.uid)
      .pipe(take(1))
      .subscribe((appointments) => {
        this.appointments = appointments.map((appointment) => {
          return {
            ...appointment,
            startDate: this.formatDate(appointment.startDate),
            endDate: this.formatDate(appointment.endDate),
          };
        });
        this.loading = false;
      });
  }

  getUser(userStorage: any) {
    this.userService
      .getPatientsById(userStorage.uid)
      .pipe(take(1))
      .subscribe((user) => (this.usuario = user[0]));
  }

  // toDateTime(secs) {
  //   const t = new Date(1970, 0, 1); // Epoch
  //   t.setSeconds(secs);
  //   return t;
  // }
  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

    return this.formateTime(year, month, day, hour, minute, second);
  }
  formateTime(year, month, day, hour, minute, second) {
    return (
      this.makeDoubleDigit(year) +
      '-' +
      this.makeDoubleDigit(month) +
      '-' +
      this.makeDoubleDigit(day) +
      ' ' +
      this.makeDoubleDigit(hour) +
      ':' +
      this.makeDoubleDigit(minute) +
      ':' +
      this.makeDoubleDigit(second)
    );
  }

  makeDoubleDigit(x) {
    return x < 10 ? '0' + x : x;
  }

  openModal(): void {
    this.isVisibleTop = true;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }

  savedAppointmentHander(event: boolean) {
    if (event) {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      this.appointmentService
        .getAppointmentByPatient(userStorage.uid)
        .pipe(take(1))
        .subscribe((appointments) => {
          this.appointments = appointments.map((appointment) => {
            return {
              ...appointment,
              startDate: this.formatDate(appointment.startDate),
              endDate: this.formatDate(appointment.endDate),
            };
          });
        });
    }
  }
}
