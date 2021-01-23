import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../providers/authentication.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
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
          this.router.navigateByUrl('/inicio');
          return false;
        } else if (user.role === 'Admin') {
          return true;
        } else {
          this.router.navigateByUrl('/inicio');
          return false;
        }
      })
    );
  }
}
