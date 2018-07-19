import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileStudentGuard implements CanActivate {
  user: any;
  Role: string;
  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getActiveUser();
    this.Role = this.user.Role;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.Role === 'Student') {
      return true;
    }
    alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
    return false;
  }
}
