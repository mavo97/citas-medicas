import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentView: string = 'principal';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeView(nameView: string) {
    this.currentView = nameView;
  }

  goToMyAccount() {
    this.router.navigate(['inicio']);
  }

  scheduleAppointment() {
    this.router.navigate(['paciente']);
  }
}
