import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended',
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent implements OnInit {
  recommendedItems: any[] = [];
  checkLogin: boolean = true;
  showErrorMessage = true;
  addtocart: boolean = false;

  constructor(private dataService: DataService , private router: Router) { }
  ngOnInit() {
    this.dataService.getRecommendedProducts().subscribe((data) => {
      this.recommendedItems = data;
    });

  }

  closeErrorMessage() {
    this.showErrorMessage = false;
    
  }

  checkLoginStatus() {
    if (localStorage.getItem('accessToken')) {
      this.checkLogin = true;
      return true;
    }
    return false;
  }
  getWishlistItems() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }
  toggleWishlist(product: any) {
    if (!this.checkLoginStatus()) {
      this.checkLogin = false;
      this.showErrorMessage = true;
    
      return;
    }
    product.isWishlisted = !product.isWishlisted;
  }

  addToCart(product: any) {
    if (!this.checkLoginStatus()) {
      this.checkLogin = false;
      this.showErrorMessage = true;
      return;
    }
    this.startCountdown();
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cartItems.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
countdownWidth = 100;

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
    // Navigate to the login page or perform login action
    this.router.navigate(['/login']);
  }
}
