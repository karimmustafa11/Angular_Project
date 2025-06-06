import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-electronics',
  imports: [CommonModule],
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.css']
})
export class ElectronicsComponent {
  electronicsItems = [
    {
      id: 1,
      name: 'Oraimo Freebude 3c',
      image: 'images/Electronics/Oraimo Freebude 3c.png',
      price: 999,
      rating: 4.6,
      reviews: 320,
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Smart Watch Series 9',
      image: 'images/Electronics/Smart Watch Series 9.png',
      price: 1499,
      rating: 4.3,
      reviews: 120,
      isWishlisted: false
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      image: 'images/Electronics/Portable Bluetooth Speaker.png',
      price: 799,
      rating: 4.7,
      reviews: 210,
      isWishlisted: false
    },
    {
      id: 4,
      name: '4K Action Camera',
      image: 'images/Electronics/4K Action Camera.png',
      price: 1899,
      rating: 4.5,
      reviews: 98,
      isWishlisted: false
    },
    {
      id: 5,
      name: 'Wireless Charging Pad',
      image: 'images/Electronics/Wireless Charging Pad.png',
      price: 349,
      rating: 4.2,
      reviews: 55,
      isWishlisted: false
    }
  ];
  // Method to toggle wishlist statu
  toggleWishlist(product: any) {
    product.isWishlisted = !product.isWishlisted;
  }
}
