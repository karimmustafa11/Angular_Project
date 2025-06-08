import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-other-section',
  imports: [CommonModule],
  templateUrl: './other-section.component.html',
  styleUrl: './other-section.component.css'
})
export class OtherSectionComponent {
  products:any = [];
  constructor(private DataService:DataService){}
  ngOnInit(){
    this.DataService.getOtherProducts().subscribe((data:any)=>{
      this.products = data;
    });
  }

}
