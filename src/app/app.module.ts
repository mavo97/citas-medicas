import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// Firebase config
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Ngzorro modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';

// Components
import { MenuComponent } from './components/shared/menu/menu.component';
import { LoginComponent } from './components/shared/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { PatientComponent } from './components/patient/patient.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, AuthComponent, AdminComponent, PatientComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
