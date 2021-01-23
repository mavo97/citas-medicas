import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../providers/authentication.service';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsInSessionGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (!user) {
          // redirect to some view explaining what happened
          return true;
        } else if (user.role === 'Admin') {
          this.router.navigateByUrl('/administrador');
          return false;
        } else {
          this.router.navigateByUrl('/paciente');
          return false;
        }
      })
    );
  }
}
