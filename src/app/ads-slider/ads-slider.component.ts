import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ads-slider',
  templateUrl: './ads-slider.component.html',
  styleUrls: ['./ads-slider.component.css'],
  imports: [CommonModule]
})
export class AdsSliderComponent {
  ads = [
    { image: 'images/Ads/ad1.jpg' },
    { image: 'images/Ads/ad2.jpg' },
    { image: 'images/Ads/ad3.avif' },
    { image: 'images/Ads/ad4.webp' }
  ];
  currentIndex = 0;
  autoSlideInterval: any;

  ngOnInit() {
  this.startAutoSlide();
}

startAutoSlide() {
  this.autoSlideInterval = setInterval(() => {
    this.next();
  }, 3000); 
}

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.ads.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.ads.length) % this.ads.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
