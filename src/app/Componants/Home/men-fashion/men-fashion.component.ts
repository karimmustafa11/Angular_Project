import { Component , OnInit} from '@angular/core';
import { CategorySectionComponent } from '../category-one-section/category-one-section.component';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-men-fashion',
  templateUrl: './men-fashion.component.html',
  imports: [CategorySectionComponent],
})
export class MenFashionComponent implements OnInit {
  products: any[] = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getMenFashionProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
    
