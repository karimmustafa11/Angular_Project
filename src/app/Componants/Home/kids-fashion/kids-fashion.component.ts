import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';


@Component({
  selector: 'app-kids-fashion',
  imports: [CommonModule, CategorySectionComponent],
  templateUrl: './kids-fashion.component.html',
  styleUrl: './kids-fashion.component.css'
})
export class KidsFashionComponent {
  products = [
    {
      image: 'images/kids/top.png',
      name: 'Tops & T-Shirts',
      discount: '30% OFF',
    },
    {
      image: 'images/kids/shirt.png',
      name: 'Shirts & Blouses',
      discount: '20% OFF',
    },
    {
      image: 'images/kids/sports.png',
      name: 'Sportswear',
      discount: '25% OFF',
    },
    {
      image: 'images/kids/bag.png',
      name: 'Bags',
      discount: '35% OFF',
    },
    {
      image: 'images/kids/foot.png',
      name: 'Footwear',
      discount: '20% OFF',
    },
    {
      image: 'images/kids/cap.png',
      name: 'Cap',
      discount: '15% OFF',
    }
  ];
}
