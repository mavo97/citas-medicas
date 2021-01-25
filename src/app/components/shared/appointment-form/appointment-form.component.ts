import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { Usuario } from '../../../interfaces/usuario-interface';
import { Appointment } from '../../../interfaces/appointment-interface';
import { AppointmentService } from '../../../providers/appointment.service';
import { Alert } from '../../../interfaces/alert';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  @Input() userAppointment: Usuario;
  startValue: Date | null = null;
  endValue: Date | null = null;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  inputValue?: string;
  alerta: Alert = new Alert();

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    // console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    // console.log('handleEndOpenChange', open);
  }
  saveAppointment() {
    const appointment: Appointment = {
      idUser: this.userAppointment.id,
      startDate: new Date(this.startValue).getTime(),
      endDate: new Date(this.endValue).getTime(),
      description: this.inputValue,
    };
    // console.log(appointment);
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
        this.alerta.mostrarAlerta('error', 'No se registro la cita!', '', 1000);
      });
  }
}
