import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ItCardComponent, ItIconComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    ItCardComponent,
    ItIconComponent,
    NgOptimizedImage
  ]
})
export class HomeComponent {

}
