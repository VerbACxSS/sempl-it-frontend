import {Component, ViewChild} from '@angular/core';
import {ItButtonDirective, ItModalComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-deleted-tokens-info-modal',
  styleUrl: './deleted-tokens-info-modal.component.scss',
  templateUrl: './deleted-tokens-info-modal.component.html',
  imports: [
    ItModalComponent,
    ItButtonDirective
  ]
})
export class DeletedTokensInfoModalComponent {
  @ViewChild(ItModalComponent) modal!: ItModalComponent;

  public open(): void {
    this.modal.toggle();
  }
}
