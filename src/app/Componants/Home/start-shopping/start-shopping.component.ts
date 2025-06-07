import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-start-shopping',
  imports: [CommonModule],
  templateUrl: './start-shopping.component.html',
  styleUrl: './start-shopping.component.css'
})
export class StartShoppingComponent implements OnInit {
  bottomItems: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBottomItems().subscribe((data) => {
      this.bottomItems = data;
    });
  }
}
