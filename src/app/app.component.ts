import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CartComponent } from "./cart/cart.component";
import { LoginComponent } from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import { AboutComponent } from "./about/about.component";  
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CartComponent, LoginComponent, SignupComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project';
}
