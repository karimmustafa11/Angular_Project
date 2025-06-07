import { Component } from '@angular/core';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';
import { DataService } from '../../../services/data-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-women-fashion',
  imports: [CategorySectionComponent],
  templateUrl: './women-fashion.component.html',
  styleUrl: './women-fashion.component.css',
})
export class WomenFashionComponent implements OnInit {
  constructor(private dataService: DataService) {}
  products: any[] = [];
  ngOnInit(): void {
    this.dataService.getWomenFashionProducts().subscribe((data) => {
      this.products = data;
    });
  } 
}
