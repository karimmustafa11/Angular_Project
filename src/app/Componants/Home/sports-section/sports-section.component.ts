import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sports-section',
  templateUrl: './sports-section.component.html',
  imports: [CommonModule],
})
export class SportsSectionComponent {
  products = [
    {
      name: 'Training Accessories',
      discount: 'Up to 60% Off',
      image: '/images/sports/shaker.png',
    },
    {
      name: 'Yoga Mat',
      discount: 'Up to 35% Off',
      image: '/images/sports/yoga-mat.png',
    },
    {
      name: 'Team Sports',
      discount: 'Up to 60% Off',
      image: '/images/sports/basketball.png',
    },
    {
      name: 'Bicycles',
      discount: 'Up to 55% Off',
      image: '/images/sports/bicycle.png',
    },
    {
      name: 'Scooters',
      discount: 'Up to 45% Off',
      image: '/images/sports/scooter.png',
    },
    {
      name: 'Cardio Equipment',
      discount: 'Up to 40% Off',
      image: '/images/sports/cardio.png',
    },
  
  ];
}
