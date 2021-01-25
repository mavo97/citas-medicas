import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
import { Appointment } from 'src/app/interfaces/appointment-interface';
import { AppointmentService } from '../../providers/appointment.service';
import { switchMap, map, take } from 'rxjs/operators';
import { UsuariosService } from '../../providers/usuarios.service';
import { combineLatest, Observable, of } from 'rxjs';
import { uniq } from 'lodash';
import { Usuario } from '../../interfaces/usuario-interface';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  joined$: Observable<any>;
  events: any[];
  observable: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      start: 'today prev,next',
      center: 'title',
      end: '',
    },
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [],
  };

  constructor(
    private appointmentService: AppointmentService,
    private usersService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.joined$ = this.getUserAppointment();
    this.joined$.subscribe((data) => {
      const events: any[] = [];
      data.map((appointment) =>
        events.push({
          title: `Cita con ${appointment.user.name}`,
          start: this.toDateTime(appointment.startDate.seconds),
          end: this.toDateTime(appointment.endDate.seconds),
          id: appointment.id,
          backgroundColor: 'yellow',
        })
      );
      this.calendarOptions.events = events;
    });
  }

  toDateTime(secs) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  getUserAppointment() {
    return this.appointmentService.getAppointments().pipe(
      take(1),
      switchMap((appointments: Appointment[]) => {
        const usersId = uniq(appointments.map((bp) => bp.idUser));

        return combineLatest(
          of(appointments),
          combineLatest(
            usersId.map((userId) =>
              this.usersService
                .getPatientsById(userId)
                .pipe(map((users) => users[0]))
            )
          )
        );
      }),
      map(([appointments, users]) => {
        return appointments.map((appointment) => {
          return {
            ...appointment,
            user: users.find((a: Usuario) => a.id === appointment.idUser),
          };
        });
      })
    );
  }
}
// this.users = this.appointmentService.getAppointments().pipe(
//   switchMap((appointments) => {
//     const joins = appointments.map((appointment) =>
//       this.usersService.getPatientsById(appointment.idUser)
//     );
//     return combineLatest(joins);
//   })
// );
