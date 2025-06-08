import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule]
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  results: any = {};

  isFocused: boolean = false;

onFocus() {
  this.isFocused = true;
}

onBlur() {
  setTimeout(() => {
    this.isFocused = false;
  }, 200);
}



  getCategories(): string[] {
    return Object.keys(this.results);
  }

  onSearchChange() {
    if (!this.searchTerm.trim()) {
      this.results = {};
      return;
    }

    this.searchService.search(this.searchTerm).subscribe(data => {
      this.results = data;
    });
  }
  isLoggedIn: boolean = false;

  constructor(public router: Router, private searchService: SearchService) { }

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
