import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public flag: boolean = false;

  constructor(private authSvc: AuthService, private router: Router) {}

  async canActivate() {
    let userLog = localStorage.getItem('token');

    let log = await this.authSvc.GetCurrentUser();

    if (log == null) {
      this.router.navigateByUrl('/login');
    }

    log.uid == userLog ? (this.flag = true) : this.router.navigateByUrl('/login');

    return this.flag;
  }
}
