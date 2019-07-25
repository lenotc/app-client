import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import swal from 'sweetalert2';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = next.data.role;
    console.log(`Role Guard =>>> ${role}`);

    if (this.authService.hasRole(role)) {
      return true;
    }

    swal.fire('Access Denied', `The user ${this.authService.user.username} has does not permission`, 'warning')
    this.router.navigate(['/clients']);

    return false;
  }

}
