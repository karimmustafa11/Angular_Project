import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
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
