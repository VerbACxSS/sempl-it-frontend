import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ItHeaderComponent, ItNavBarItemComponent} from 'design-angular-kit';
import {NgOptimizedImage} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ItHeaderComponent,
    ItNavBarItemComponent
  ],
})
export class HeaderComponent {
  public MENU_ITEMS: Array<any> = [
    {name: 'Home', path: '/home'},
    {name: 'Semplifica', path: '/ats'},
    {name: 'Analizza', path: '/document-analyzer'},
    {name: 'Confronta', path: '/documents-comparison'},
    {name: 'Assistenza', path: '/support'}
  ]

  constructor(public router: Router) {
  }
}
