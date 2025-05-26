import { Component } from '@angular/core';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';

@Component({
  selector: 'app-men-fashion',
  templateUrl: './men-fashion.component.html',
  imports: [CategorySectionComponent],
})
export class MenFashionComponent {
  products = [
    {
      image: 'images/men/top.png',
      name: 'Tops & T-Shirts',
      discount: '30% OFF',
    },
    {
      image: 'images/men/summer.png',
      name: 'Summer Collection',
      discount: '20% OFF',
    },
    {
      image: 'images/men/sport.png',
      name: 'Sportswear',
      discount: '25% OFF',
    },
    {
      image: 'images/men/bag.png',
      name: 'Leather Bag',
      discount: '35% OFF',
    },
    {
      image: 'images/men/foot.png',
      name: 'Footwear',
      discount: '20% OFF',
    },
    {
      image: 'images/men/cap.png',
      name: 'Cap',
      discount: '15% OFF',
    }
  ];
}
