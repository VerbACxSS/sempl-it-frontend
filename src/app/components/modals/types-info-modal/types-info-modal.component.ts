import {Component, ViewChild} from '@angular/core';
import {ItButtonDirective, ItModalComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-types-info-modal',
  styleUrl: './types-info-modal.component.scss',
  templateUrl: './types-info-modal.component.html',
  imports: [
    ItModalComponent,
    ItButtonDirective
  ]
})
export class TypesInfoModalComponent {
  @ViewChild(ItModalComponent) modal!: ItModalComponent;

  public open(): void {
    this.modal.toggle();
  }
}
