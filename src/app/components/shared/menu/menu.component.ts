import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../providers/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  theme: boolean = true;
  tipoUsuario: string;

  constructor(public auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.tipoUsuario();
  }

  ngDoCheck() {
    this.auth.messageCurrent.subscribe(
      (message) => (this.tipoUsuario = message)
    );
  }

  logOut() {
    this.auth.logOut();
  }
}
