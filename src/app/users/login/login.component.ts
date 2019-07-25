import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private router: Router, private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hi ${this.authService.user.username} is already authenticated `, 'info');
      this.router.navigate(['/clients']);
    }
  }

  login() {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      swal.fire('Error on Login', 'Username or password must be not null', 'error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);

      const user = this.authService.user;

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);

      this.router.navigate(['/clients']);
      swal.fire('Login', `Hi ${user.username}, your login is success`, 'success');
    }, err => {
      if (err.status == 400) {
        swal.fire('Error on Login', 'User or Password is incorrect', 'error');
      }
    });
  }

}
