import {Component, ViewChild} from '@angular/core';
import {ItButtonDirective, ItModalComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-active-verbs-info-modal',
  styleUrl: './active-verbs-info-modal.component.scss',
  templateUrl: './active-verbs-info-modal.component.html',
  imports: [
    ItModalComponent,
    ItButtonDirective
  ]
})
export class ActiveVerbsInfoModalComponent {
  @ViewChild(ItModalComponent) modal!: ItModalComponent;

  public open(): void {
    this.modal.toggle();
  }
}
