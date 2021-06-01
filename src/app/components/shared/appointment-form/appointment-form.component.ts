import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Usuario } from '../../../interfaces/usuario-interface';
import { Appointment } from '../../../interfaces/appointment-interface';
import { AppointmentService } from '../../../providers/appointment.service';
import { Alert } from '../../../interfaces/alert';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  @Input() userAppointment: Usuario;
  startValue: Date | null = null;
  endValue: Date | null = null;
  currentDate: Date = new Date();
  dates: Date[];
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  inputValue?: string;
  alerta: Alert = new Alert();
  savedAppointments$: Observable<{}[]>;
  appointments: any[];
  loading: boolean;

  constructor(private appointmentService: AppointmentService) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.savedAppointments$ = this.appointmentService.savedAppointments();
    this.appointments = await this.savedAppointments$.pipe(take(1)).toPromise();
    this.loading = false;
    // console.log(this.appointments);
  }

  diffMinutes(date2: Date, date1: Date): number {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  dateInPast(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getTime() <= secondDate.getTime();
  }

  saveAppointment() {
    // console.log(appointment);
    const dateInPast = this.dateInPast(this.startValue, this.currentDate);
    if (!dateInPast) {
      const saveDates = this.datesValidation();
      if (saveDates) {
        // console.log('Se puede guardar');
        //TODO: Validar si esta disponible la fecha
        const startDate = new Date(
          this.roundMinutes(this.startValue)
        ).getTime();
        const endDate = new Date(this.roundMinutes(this.endValue)).getTime();
        // console.log(this.appointments);

        const quotesFound = this.appointments.filter(
          (appoint) =>
            this.roundMinutes2(appoint.startDate) === startDate ||
            this.roundMinutes2(appoint.endDate) === endDate
        );
        console.log(
          quotesFound.map(
            (a) => (a.startDate = new Date(this.roundMinutes2(a.startDate)))
          )
        );

        if (quotesFound.length === 0) {
          const appointment: Appointment = {
            idUser: this.userAppointment.id,
            startDate: new Date(this.startValue).getTime(),
            endDate: new Date(this.endValue).getTime(),
            description: this.inputValue,
          };
          this.alerta.loading();
          // console.log('Se puede guardar');
          this.appointmentService
            .addAppointment(appointment)
            .then(() => {
              this.alerta.mostrarAlerta(
                'success',
                'La cita fue registrada!',
                '',
                1000
              );
              this.startValue;
              this.endValue;
              this.inputValue;
            })
            .catch(() => {
              this.alerta.mostrarAlerta(
                'error',
                'No se registro la cita!',
                '',
                1000
              );
            });
        } else {
          this.alerta.mostrarAlerta(
            'error',
            'Ya se encuentra registrada esta fecha!',
            '',
            2500
          );
          this.dates = [];
        }
      }
    } else {
      this.dates = [];
    }
  }

  onChange(event: any) {
    console.log('On change', event);
  }
  onCalendarChange(event: any) {
    // console.log('On calendar change', event);
  }
  onOk(event: Date[]) {
    console.log('On ok', event);
    this.startValue = event[0];
    this.endValue = event[1];

    if (this.startValue && this.endValue) {
      const dateInPast = this.dateInPast(this.startValue, this.currentDate);
      if (!dateInPast) {
        const saveDates = this.datesValidation();
        if (saveDates) {
          console.log('Se puede guardar');
        }
      } else {
        this.dates = [];
      }
    }
  }

  datesValidation(): boolean {
    if (this.startValue && this.endValue) {
      const date1 = new Date(this.startValue).getMinutes();
      const date2 = new Date(this.endValue).getMinutes();

      if (date1 === 0 || (date1 === 30 && date2 === 0) || date2 === 30) {
        console.log(date1, date2);
        if (this.startValue && this.endValue) {
          const minutes = this.diffMinutes(this.endValue, this.startValue);
          // console.log(minutes);
          if (minutes <= 30) {
            console.log('Se puede guardar la cita');
            return true;
          } else {
            // console.log('No se puede guardar la cita');
            this.startValue = null;
            this.endValue = null;
            this.dates = [];
            this.alerta.mostrarAlerta(
              'error',
              'Hubo un error!',
              'Las horas de la cita deben ser como en el siguiente ejemplo: 14:00 o 14:30. Y tener un lapso de tiempo de media hora.',
              5000
            );
            return false;
          }
        }
      } else {
        this.startValue = null;
        this.endValue = null;
        this.dates = [];
        this.alerta.mostrarAlerta(
          'error',
          'Hubo un error!',
          'Las horas de la cita deben ser como en el siguiente ejemplo: 14:00 o 14:30. Y tener un lapso de tiempo de media hora.',
          5000
        );
        return false;
      }
    }
  }

  roundMinutes(dateNumber: Date) {
    const date = new Date(dateNumber);
    // date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    // date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    date.setSeconds(0, 0);

    return date;
  }

  roundMinutes2(dateNumber: number) {
    const date = new Date(dateNumber);
    // date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));
    // date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    date.setSeconds(0, 0);

    const newDate = new Date(date).getTime();
    return newDate;
  }
}
