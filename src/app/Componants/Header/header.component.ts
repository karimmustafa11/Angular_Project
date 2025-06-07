import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(public router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  login() {
    this.router.navigate(['/login']);
  }

  About() {
    this.router.navigate(['/about']);
  }
}
