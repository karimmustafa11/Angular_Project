import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-sports-section',
  templateUrl: './sports-section.component.html',
  imports: [CommonModule],
})
export class SportsSectionComponent implements OnInit {
  constructor(private dataService: DataService) {}
  products: any[] = [];

  ngOnInit() {
    this.dataService.getSportsProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
