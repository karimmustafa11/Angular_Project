import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../Componants/Header/header.component";
import { FooterComponent } from "../Componants/Footer/footer.component";

@Component({
  selector: 'app-full-layout-component',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './full-layout-component.component.html',
  styleUrls: ['./full-layout-component.component.css']

})
export class FullLayoutComponent {

}
