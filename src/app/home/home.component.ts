import { Component } from '@angular/core';
import { TreatYourselfTodayComponent } from '../treat-yourself-today/treat-yourself-today.component';
import { AdsSliderComponent } from "../ads-slider/ads-slider.component";

@Component({
  selector: 'app-home',
  imports: [TreatYourselfTodayComponent, AdsSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
