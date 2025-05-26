import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-other-section',
  imports: [CommonModule],
  templateUrl: './other-section.component.html',
  styleUrl: './other-section.component.css'
})
export class OtherSectionComponent {
 products = [
    {
      name: 'Books',
      discount: 'Up to 60% Off',
      image: '/images/other/book.png',
    },
    {
      name: 'Music',
      discount: 'Up to 35% Off',
      image: '/images/other/piano.png',
    },
    {
      name: 'Pet Supplies',
      discount: 'Up to 60% Off',
      image: '/images/other/animals.png',
    },
    {
      name: 'Tools & Home Improvement',
      discount: 'Up to 55% Off',
      image: '/images/other/tool-boxes.png',
    }
  
  ];
}
