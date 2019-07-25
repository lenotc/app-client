import {Component} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title = 'App Angular';

  constructor(private authService: AuthService, private router: Router) {
  }

  logout(): void {
    swal.fire('Logout', `Hi ${this.authService.user.username}, has logout!`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
