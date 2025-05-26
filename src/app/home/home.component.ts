import { Component } from '@angular/core';
import { TreatYourselfTodayComponent } from '../treat-yourself-today/treat-yourself-today.component';

@Component({
  selector: 'app-home',
  imports: [TreatYourselfTodayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
