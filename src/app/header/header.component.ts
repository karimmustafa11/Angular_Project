import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'My Angular App';
  subtitle = 'Welcome to my app!';

  constructor() {
    // Initialization logic can go here
  }

  // Add any methods or properties needed for the header component                  
  toggleMenu() {
    // Logic to toggle the menu
  } 
}
