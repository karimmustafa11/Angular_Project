import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems.next(stored);
  }

  updateCart(items: any[]) {
    this.cartItems.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  getCurrentCart(): any[] {
    return this.cartItems.getValue();
  }

  addToCart(product: any) {
    const cart = this.getCurrentCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.updateCart(cart);
  }
}
