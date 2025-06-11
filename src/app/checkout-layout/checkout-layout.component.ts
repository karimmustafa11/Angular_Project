import { Component } from '@angular/core';
import { HeaderComponent } from '../Componants/Header/header.component';
import { FooterComponent } from '../Componants/Footer/footer.component';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-checkout-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './checkout-layout.component.html',
  styleUrl: './checkout-layout.component.css'
})
export class CheckoutLayoutComponent {

}
