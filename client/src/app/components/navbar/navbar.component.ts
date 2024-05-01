import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnChanges {

  public isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    console.log(localStorage.getItem('jwt_token'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.isLoggedIn = this.authService.loggedIn();
    console.log(changes);
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
    
    this.cdr.detectChanges();
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

}
