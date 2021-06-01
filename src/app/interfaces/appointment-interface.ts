export class Appointment {
  id?: string;
  idUser: string;
  startDate: number;
  endDate: number;
  description?: string;
}

export interface Appointments {
  id?: string;
  idUser: string;
  startDate: number;
  endDate: number;
  description?: string;
}
