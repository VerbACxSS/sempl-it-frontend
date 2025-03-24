import {Component} from '@angular/core';
import {ItButtonDirective, ItTextareaComponent} from 'design-angular-kit';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../utils/FormUtils';
import {AlertService} from '../../services/alert.service';
import {AnalysisService} from '../../services/analysis.service';
import {TextComparatorComponent} from '../../components/text-comparator/text-comparator.component';
import {DiffMetrics, SimilarityMetrics, TextMetrics} from '../../model/Metrics';

@Component({
  standalone: true,
  selector: 'app-document-comparison',
  styleUrl: './document-comparison.component.scss',
  templateUrl: './document-comparison.component.html',
  imports: [
    ItButtonDirective,
    ItTextareaComponent,
    ReactiveFormsModule,
    TextComparatorComponent,
  ]
})
export class DocumentComparisonComponent {
  protected readonly FormUtils = FormUtils;

  public analyzerForm: FormGroup;

  public text1!: string;
  public text2!: string;
  public metrics1!: TextMetrics;
  public metrics2!: TextMetrics;
  public similarity!: SimilarityMetrics;
  public diff!: DiffMetrics;

  constructor(private alertService: AlertService,
              private analysisService: AnalysisService) {
    this.analyzerForm = new FormGroup({
      text1: new FormControl('', [Validators.required, Validators.maxLength(3000)]),
      text2: new FormControl('', [Validators.required, Validators.maxLength(3000)])
    });
  }

  public fieldLengthDescription(field: string): string {
    const fieldLength = this.analyzerForm.get(field)?.value.length;
    return fieldLength ? `${fieldLength}/3000` : '';
  }

  public compare(): void {
    this.analyzerForm.markAllAsTouched();
    if (this.analyzerForm.invalid) {
      this.alertService.showError('Errore', 'Compilare tutti i campi');
      return;
    }

    const text1 = this.analyzerForm.value.text1;
    const text2 = this.analyzerForm.value.text2;
    this.analysisService.comparisonAnalysis(text1, text2)
      .subscribe({
        next: (result) => {
          this.text1 = text1;
          this.text2 = text2;
          this.metrics1 = result.metrics1;
          this.metrics2 = result.metrics2;
          this.similarity = result.similarity;
          this.diff = result.diff;
        },
        error: (error) => {
          this.alertService.showError('Errore', error.error);
        }
      });
  }
}
