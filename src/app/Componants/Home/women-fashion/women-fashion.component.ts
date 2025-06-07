import { Component } from '@angular/core';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';

@Component({
  selector: 'app-women-fashion',
  imports: [CategorySectionComponent],
  templateUrl: './women-fashion.component.html',
  styleUrl: './women-fashion.component.css',
})
export class WomenFashionComponent {
  products = [
    {
      image: 'images/women/top.png',
      name: 'Tops & T-Shirts',
      discount: '30% OFF',
    },
    {
      image: 'images/women/shirt.png',
      name: 'Shirts & Blouses',
      discount: '20% OFF',
    },
    {
      image: 'images/women/sport.png',
      name: 'Sportswear',
      discount: '25% OFF',
    },
    {
      image: 'images/women/bag.png',
      name: 'Leather Bag',
      discount: '35% OFF',
    },
    {
      image: 'images/women/foot.png',
      name: 'Footwear',
      discount: '20% OFF',
    },
    {
      image: 'images/women/cap.png',
      name: 'Cap',
      discount: '15% OFF',
    }
  ];
}
