import {Component, ViewChild} from '@angular/core';
import {ItButtonDirective, ItModalComponent} from 'design-angular-kit';

@Component({
  standalone: true,
  selector: 'app-semantic-similarity-info-modal',
  styleUrl: './semantic-similarity-info-modal.component.scss',
  templateUrl: './semantic-similarity-info-modal.component.html',
  imports: [
    ItModalComponent,
    ItButtonDirective
  ]
})
export class SemanticSimilarityInfoModalComponent {
  @ViewChild(ItModalComponent) modal!: ItModalComponent;

  public open(): void {
    this.modal.toggle();
  }
}
