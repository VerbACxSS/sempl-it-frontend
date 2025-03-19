import {Component} from '@angular/core';
import {ItButtonDirective, ItIconComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-support',
  styleUrl: './support.component.scss',
  templateUrl: './support.component.html',
  imports: [
    ItIconComponent,
    ItButtonDirective
  ],
})
export class SupportComponent {

  public sendMail(): void {
    window.location.href = 'mailto:sempl.it.assistenza@gmail.com';
  }
}
