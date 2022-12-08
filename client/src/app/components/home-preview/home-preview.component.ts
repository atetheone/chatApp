import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-preview',
  templateUrl: './home-preview.component.html',
  styleUrls: ['./home-preview.component.sass']
})
export class HomePreviewComponent implements OnInit {
  public isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('currentUser') !== null;
    if (this.isLoggedIn) this.router.navigateByUrl('/home');
  }


}
