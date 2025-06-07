import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

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
