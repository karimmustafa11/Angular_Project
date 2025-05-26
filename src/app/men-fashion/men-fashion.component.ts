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
      image: 'images/men/dress1.jpg',
      name: 'Summer Dress',
      discount: '30% OFF',
    },
    {
      image: 'images/men/bag1.jpg',
      name: 'Leather Bag',
      discount: '20% OFF',
    },
    {
      image: 'images/men/bag1.jpg',
      name: 'Leather Bag',
      discount: '25% OFF',
    },
    {
      image: 'images/men/bag1.jpg',
      name: 'Leather Bag',
      discount: '35% OFF',
    },
    {
      image: 'images/men/bag1.jpg',
      name: 'Leather Bag',
      discount: '20% OFF',
    },
    {
      image: 'images/men/bag1.jpg',
      name: 'Leather Bag',
      discount: '15% OFF',
    }
  ];
}
