import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-treat-yourself-today',
  imports: [CommonModule],
  templateUrl: './treat-yourself-today.component.html',
  styleUrl: './treat-yourself-today.component.css'
})
export class TreatYourselfTodayComponent {
  topItems = [
    { title: 'Headphones', image: 'images/TreatYourselfToday/headphones.png' },
    { title: 'Makeup', image: 'images/TreatYourselfToday/makeup.png' },
    { title: 'Coffee Machines', image: 'images/TreatYourselfToday/coffee-machine.png' },
    { title: 'Home Decor', image: 'images/TreatYourselfToday/home-decor.png' },
    { title: 'Stylish Outfits', image: 'images/TreatYourselfToday/clothes.png' },
    { title: 'Skincare', image: 'images/TreatYourselfToday/skincare.png' },
  ];

}
