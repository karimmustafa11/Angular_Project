import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  results: any = {};
  profileImage: string | null = null;
  isFocused: boolean = false;
  wishlistCount: number = 0;
  cartCount: number = 0;
  cartItems: any[] = [];
  showCartView = false;
  cartSub!: Subscription;
  wishlistItems: any[] = [];
  showWishlistView = false;

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
  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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

  constructor(public router: Router, private searchService: SearchService, private userService: UserService, private wishlistService: WishlistService, private cartService: CartService) {
    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.cartSub = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    this.userService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });

    this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistCount = items.length;
    });


  }
  toggleWishlistView() {
    this.showWishlistView = !this.showWishlistView;
  }
  removeFromWishlist(item: any) {
    this.wishlistService.removeFromWishlist(item.id);
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistService.getCurrentWishlist().some(item => item.id === productId);
  }

  loadCartItems() {
    this.cartService.loadCartFromStorage();
  }

  toggleCartView() {
    this.showCartView = !this.showCartView;
    if (this.showCartView) {
      this.loadCartItems();
    }
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

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item.id);
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item.id);
  }

  removeItem(productId: any) {
    this.cartService.removeFromCart(productId);
  }


  updateCartStorage() {
    const userId = this.getCurrentUserId();
    const cartKey = 'cart_' + userId;
    localStorage.setItem(cartKey, JSON.stringify(this.cartItems));
  }
  getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }
  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }
}