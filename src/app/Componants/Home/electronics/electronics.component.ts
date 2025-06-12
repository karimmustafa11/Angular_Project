import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { WishlistService } from '../../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent implements OnInit {
  electronicsItems: any[] = [];
  checkLogin = true;
  showErrorMessage = true;
  addtocart: boolean = false;
  countdownWidth = 100;
  constructor(private dataService: DataService, private wishlistService: WishlistService, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.dataService.getElectronicsProducts().subscribe((data) => {
      this.electronicsItems = data.map(item => ({ ...item }));


      if (this.checkLoginStatus()) {
        const currentWishlist = this.wishlistService.getCurrentWishlist();
        this.electronicsItems.forEach(item => {
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
