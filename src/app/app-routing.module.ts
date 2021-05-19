import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HomeComponent } from './components/home/home.component';

// Guards
import { IsPatientGuard } from './guards/is-patient.guard';
import { PatientComponent } from './components/patient/patient.component';
import { IsInSessionGuard } from './guards/is-in-session.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: AuthComponent, canActivate: [IsInSessionGuard] },
  {
    path: 'paciente',
    component: PatientComponent,
    canActivate: [IsPatientGuard],
  },
  {
    path: 'administrador',
    component: AdminComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'citas',
    component: AppointmentsComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
