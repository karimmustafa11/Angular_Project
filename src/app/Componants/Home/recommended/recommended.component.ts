import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent implements OnInit {
  recommendedItems: any[] = [];
  checkLogin: boolean = true;
  showErrorMessage = true;
  addtocart: boolean = false;
  countdownWidth = 100;

  constructor(
    private dataService: DataService,
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.dataService.getRecommendedProducts().subscribe((data) => {
      this.recommendedItems = data.map(item => ({ ...item }));


      if (this.checkLoginStatus()) {
        const currentWishlist = this.wishlistService.getCurrentWishlist();
        this.recommendedItems.forEach(item => {
          item.isWishlisted = currentWishlist.some((wish: any) => wish.id === item.id);
        });
      }
    });
  }


  isInWishlist(productId: string | number): boolean {
    const idNum = Number(productId);
    return this.wishlistService.getCurrentWishlist().some(item => Number(item.id) === idNum);
  }


  toggleWishlist(product: any) {
    if (!this.checkLoginStatus()) {
      this.checkLogin = false;
      this.showErrorMessage = true;
      return;
    }

    const newStatus = this.wishlistService.toggleWishlist(product);
    product.isWishlisted = newStatus;
  }


  addToCart(product: any) {
    if (!this.checkLoginStatus()) {
      this.checkLogin = false;
      this.showErrorMessage = true;
      return;
    }

    this.cartService.addToCart(product);
    this.startCountdown();
  }

  startCountdown() {
    this.addtocart = true;
    let countdown = 100;
    const interval = setInterval(() => {
      countdown -= 5;
      this.countdownWidth = countdown;
      if (countdown <= 0) {
        clearInterval(interval);
        this.addtocart = false;
        this.countdownWidth = 100;
      }
    }, 100);
  }

  loginNow() {
    this.router.navigate(['/login']);
  }

  checkLoginStatus(): boolean {
    if (localStorage.getItem('accessToken')) {
      this.checkLogin = true;
      return true;
    }
    return false;
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }

  closeErrorMassage() {
    this.showErrorMessage = false;
  }
}
