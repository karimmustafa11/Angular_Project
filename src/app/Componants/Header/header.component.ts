import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { WishlistService } from '../../services/wishlist.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule]
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  results: any = {};
  profileImage: string | null = null;
  isFocused: boolean = false;
  wishlistCount: number = 0;

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 200);
  }





  getCategories(): string[] {
    if (!this.searchTerm.trim()) {
      return Object.keys(this.results);
    }

    const term = this.searchTerm.toLowerCase();
    return Object.keys(this.results).filter(category => {
      const lowerCategory = category.toLowerCase();

      if (lowerCategory.includes(term)) {
        return true;
      }

      return this.results[category]?.some((item: any) =>
        (item.name && item.name.toLowerCase().includes(term)) ||
        (item.title && item.title.toLowerCase().includes(term))
      );
    });
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

  constructor(public router: Router, private searchService: SearchService, private userService: UserService, private wishlistService: WishlistService) { }

  ngOnInit() {
    this.checkLoginStatus();

    this.userService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });

    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistCount = items.length;
    });

  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    this.profileImage = null;
    this.router.navigate(['/login']);
  }
  login() {
    this.router.navigate(['/login']);
  }

  About() {
    this.router.navigate(['/about']);
  }

  Heartclick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/wishlist']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  Cartclick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  Homeclick() {
    this.router.navigate(['/home']);
  }

  Profileclick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
