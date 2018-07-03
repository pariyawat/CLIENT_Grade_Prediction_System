import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { redirectLink } from '../models/app.url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private route: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const session = this.authService.getActiveUser();
    if (!session) {
      this.route.navigate([redirectLink.loginPage]);
      return false;
    } else {
      return true;
    }
  }
}
