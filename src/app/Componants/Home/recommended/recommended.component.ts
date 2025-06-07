import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recommended',
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent {
  recommendedItems = [
    {
      id: 1,
      name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium 5G With FaceTime - Middle East Version',
      image: 'images/recommended/iphone.png',
      rating: 4.6,
      reviews: '17.7K',
      price: 75800,
      oldPrice: 77458,
      badge: '',
      delivery: 'Free Delivery',
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra 5G Dual SIM Titanium Gray 12GB RAM 256GB - Middle East Version',
      image: 'images/recommended/samsung.png',
      rating: 4.5,
      reviews: '18.8K',
      price: 54990,
      oldPrice: 0,
      badge: '',
      delivery: 'Free Delivery',
      isWishlisted: false
    },
    {
      id: 3,
      name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium 5G With FaceTime - International Version',
      image: 'images/recommended/iphone2.png',
      rating: 4.6,
      reviews: '17.7K',
      price: 75800,
      oldPrice: 77376,
      badge: '',
      delivery: 'Free Delivery',
      isWishlisted: false
    },
    {
      id: 4,
      name: 'Apple iPad 2022 (10th Generation) 10.9-inch 64GB WiFi Blue - Middle East Version',
      image: 'images/recommended/ipad.png',
      rating: 4.6,
      reviews: '18.6K',
      price: 17193,
      oldPrice: 17499,
      badge: 'express',
      delivery: '',
      isWishlisted: false
    },
    {
      id: 5,
      name: 'Samsung Galaxy S24 Ultra 5G Dual SIM Titanium Black 12GB RAM 256GB - Middle East Version',
      image: 'images/recommended/samsung2.png',
      rating: 4.5,
      reviews: '18.8K',
      price: 53979,
      oldPrice: 0,
      badge: 'lowest',
      delivery: 'Lowest price in 30 days',
      isWishlisted: false
    },

  ];

  toggleWishlist(product: any) {
    product.isWishlisted = !product.isWishlisted;
  }
}
