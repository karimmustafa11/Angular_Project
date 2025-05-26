import { Component } from '@angular/core';
import { TreatYourselfTodayComponent } from '../treat-yourself-today/treat-yourself-today.component';
import { AdsSliderComponent } from "../ads-slider/ads-slider.component";
import { SportsSectionComponent } from "../sports-section/sports-section.component";
import { OtherSectionComponent } from "../other-section/other-section.component";

@Component({
  selector: 'app-home',
  imports: [TreatYourselfTodayComponent, AdsSliderComponent, SportsSectionComponent, OtherSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
