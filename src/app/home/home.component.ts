import { Component } from '@angular/core';
import { TreatYourselfTodayComponent } from '../treat-yourself-today/treat-yourself-today.component';
import { AdsSliderComponent } from "../ads-slider/ads-slider.component";
import { SportsSectionComponent } from "../sports-section/sports-section.component";
import { OtherSectionComponent } from "../other-section/other-section.component";
import { MenFashionComponent } from "../men-fashion/men-fashion.component";
import { WomenFashionComponent } from "../women-fashion/women-fashion.component";
import { KidsFashionComponent } from '../kids-fashion/kids-fashion.component';
import { StartShoppingComponent } from "../start-shopping/start-shopping.component";

@Component({
  selector: 'app-home',
  imports: [TreatYourselfTodayComponent, AdsSliderComponent, SportsSectionComponent, OtherSectionComponent, MenFashionComponent, WomenFashionComponent, KidsFashionComponent, StartShoppingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
