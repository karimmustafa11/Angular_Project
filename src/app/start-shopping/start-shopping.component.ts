import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start-shopping',
  imports: [CommonModule],
  templateUrl: './start-shopping.component.html',
  styleUrl: './start-shopping.component.css'
})
export class StartShoppingComponent {
  bottomItems = [
    { title: 'Phones', image: 'images/StartShopping/phone.png' },
    { title: 'Smart Watches', image: 'images/StartShopping/smartwatch.png' },
    { title: 'Washing Machines', image: 'images/StartShopping/washing-machine.png' },
    { title: 'TVs', image: 'images/StartShopping/tv.png' },
    { title: 'Perfumes', image: 'images/StartShopping/perfume.png' },
    { title: 'Classic Watches', image: 'images/StartShopping/watch.png' },
  ];
}
