import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-treat-yourself-today',
  imports: [CommonModule],
  templateUrl: './treat-yourself-today.component.html',
  styleUrl: './treat-yourself-today.component.css'
})
export class TreatYourselfTodayComponent implements OnInit {
  constructor(private dataService: DataService) { }
  topItems: any[] = [];

  ngOnInit() {
    this.dataService.getTopItems().subscribe((data) => {
      this.topItems = data;
    });
  }

}
