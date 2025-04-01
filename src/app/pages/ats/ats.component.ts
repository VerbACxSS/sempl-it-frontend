import {Component} from '@angular/core';
import {
  ItButtonDirective, ItCardComponent, ItIconComponent,
  ItTabContainerComponent, ItTabItemComponent,
  ItTextareaComponent,
} from 'design-angular-kit';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {SimplificationService} from '../../services/simplification.service';
import {FormUtils} from '../../utils/FormUtils';
import {TextComparatorComponent} from "../../components/text-comparator/text-comparator.component";
import {DiffMetrics, SimilarityMetrics, TextMetrics} from "../../model/Metrics";
import {Simplification} from '../../model/SimplificationResult';
import {
  SimplificationInfoModalComponent
} from '../../components/modals/simplification-info-modal/simplification-info-modal.component';

@Component({
  standalone: true,
  selector: 'app-ats',
  styleUrl: './ats.component.scss',
  templateUrl: './ats.component.html',
  imports: [
    FormsModule,
    ItButtonDirective,
    ItTextareaComponent,
    ReactiveFormsModule,
    TextComparatorComponent,
    ItTabContainerComponent,
    ItTabItemComponent,
    ItCardComponent,
    ItIconComponent,
    SimplificationInfoModalComponent,
  ]
})
export class AtsComponent {
  protected readonly FormUtils = FormUtils;

  public simplificationForm: FormGroup;

  public text!: string;
  public simplifiedText!: string;
  public simplifications!: Simplification;
  public metrics1!: TextMetrics;
  public metrics2!: TextMetrics;
  public similarity!: SimilarityMetrics;
  public diff!: DiffMetrics;

  constructor(private alertService: AlertService,
              private simplificationService: SimplificationService) {
    this.simplificationForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(3000)])
    });
  }

  public parseText(text: string): string {
    return text.replace(/\r\n|\r|\n/g, '<br>');
  }

  public fieldLengthDescription(field: string): string {
    const fieldLength = this.simplificationForm.get(field)?.value.length;
    return fieldLength ? `${fieldLength}/3000` : '';
  }

  public simplify() {
    this.simplificationForm.markAllAsTouched();
    if (!this.simplificationForm.valid) {
      this.alertService.showError('Errore', 'Compilare tutti i campi');
      return;
    }

    // Use form text
    this.doSimplification(this.simplificationForm.value.text);
  }

  public resimplify() {
    // Use last saved text
    this.doSimplification(this.text);
  }

  public doSimplification(text: string) {
    this.simplificationService.simplify(text)
      .subscribe({
        next: (response) => {
          this.text = text;
          this.simplifiedText = response.simplifiedText;
          this.simplifications = response.simplificationSteps;
          this.metrics1 = response.metrics1;
          this.metrics2 = response.metrics2;
          this.similarity = response.similarity;
          this.diff = response.diff;
        },
        error: (error) => {
          this.alertService.showError('Errore', "Si è verificato un errore durante la semplificazione del testo. Riprova più tardi.");
        }
      });
  }
}
