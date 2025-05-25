import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gender-select',
  standalone: true,
  imports: [MatSelectModule, BrowserAnimationsModule, FormsModule],
  template: `
    <mat-form-field appearance="fill" style="width: 250px;">
      <mat-label>Gender</mat-label>
      <mat-select [(ngModel)]="selectedGender" required>
        <mat-option value="male">Male</mat-option>
        <mat-option value="female">Female</mat-option>
        <mat-option value="other">Other</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class GenderSelectComponent {
  selectedGender: string | null = null;
}
