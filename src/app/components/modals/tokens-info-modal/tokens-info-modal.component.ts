import {Component, ViewChild} from '@angular/core';
import {ItButtonDirective, ItModalComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-tokens-info-modal',
  styleUrl: './tokens-info-modal.component.scss',
  templateUrl: './tokens-info-modal.component.html',
  imports: [
    ItModalComponent,
    ItButtonDirective
  ]
})
export class TokensInfoModalComponent {
  @ViewChild(ItModalComponent) modal!: ItModalComponent;

  public open(): void {
    this.modal.toggle();
  }
}
