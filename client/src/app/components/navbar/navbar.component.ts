import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  home = faHome;

  public isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    console.log(localStorage.getItem('jwt_token'));
  }

  onLogout() {
    this.authService.logout();
  }

}
