import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';
import { DataService } from '../../../services/data-service.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-kids-fashion',
  imports: [CommonModule, CategorySectionComponent],
  templateUrl: './kids-fashion.component.html',
  styleUrl: './kids-fashion.component.css'
})
export class KidsFashionComponent implements OnInit {
  constructor(private dataService: DataService) {}
  products: any[] = [];

  ngOnInit() {
    this.dataService.getKidsFashionProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
