import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-one-section.component.html',
})
export class CategorySectionComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() products!: { image: string; name: string; discount: string }[];
}
