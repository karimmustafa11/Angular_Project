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

  private getUserCartKey(): string {
    const userId = localStorage.getItem('userId');
    return userId ? `cart_${userId}` : 'cart_guest';
  }

  public loadCartFromStorage() {
    const key = this.getUserCartKey();
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    this.cartItems.next(stored);
  }

  private saveCartToStorage(items: any[]) {
    const key = this.getUserCartKey();
    localStorage.setItem(key, JSON.stringify(items));
  }

  updateCart(items: any[]) {
    this.cartItems.next(items);
    this.saveCartToStorage(items);
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

  removeFromCart(productId: any) {
    const cart = this.getCurrentCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    this.updateCart(updatedCart);
  }

  increaseQuantity(productId: any) {
    const cart = this.getCurrentCart();
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity += 1;
    this.updateCart(cart);
  }

  decreaseQuantity(productId: any) {
    const cart = this.getCurrentCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateCart(cart);
    }
  }

}

