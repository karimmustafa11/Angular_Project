import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = new BehaviorSubject<any[]>([]);
  wishlistItems$ = this.wishlistItems.asObservable();

  constructor() { }

  loadWishlistFromStorage() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const key = 'wishlist_' + userId;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      this.wishlistItems.next(stored);
    }
  }

  updateWishlist(items: any[]) {
    this.wishlistItems.next(items);
    const userId = localStorage.getItem('userId');
    if (userId) {
      const key = 'wishlist_' + userId;
      localStorage.setItem(key, JSON.stringify(items));
    }
  }

  getCurrentWishlist(): any[] {
    return this.wishlistItems.getValue();
  }

  removeFromWishlist(itemId: string) {
    const updated = this.getCurrentWishlist().filter(item => item.id !== itemId);
    this.updateWishlist(updated);
  }

  toggleWishlist(product: any): boolean {
    const userId = localStorage.getItem('userId');
    if (!userId) return false;

    const key = 'wishlist_' + userId;
    let wishlist = JSON.parse(localStorage.getItem(key) || '[]');

    const index = wishlist.findIndex((item: any) => item.id === product.id);

    if (index === -1) {
      wishlist.push({ ...product });
    } else {
      wishlist.splice(index, 1);
    }

    this.updateWishlist(wishlist);
    return index === -1;
  }

}
