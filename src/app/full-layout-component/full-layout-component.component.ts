import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-full-layout-component',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './full-layout-component.component.html',
  styleUrls: ['./full-layout-component.component.css']

})
export class FullLayoutComponent {

}
