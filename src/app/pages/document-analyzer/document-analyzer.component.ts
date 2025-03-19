import {Component} from '@angular/core';
import {ItButtonDirective, ItInputComponent, ItTextareaComponent} from 'design-angular-kit';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../utils/FormUtils';
import {AnalysisService} from '../../services/analysis.service';
import {TextMetrics} from '../../model/Metrics';
import {AlertService} from '../../services/alert.service';
import {TextMetricsComponent} from '../../components/text-metrics/text-metrics.component';

@Component({
  standalone: true,
  selector: 'app-document-analyzer',
  styleUrl: './document-analyzer.component.scss',
  templateUrl: './document-analyzer.component.html',
  imports: [
    ItInputComponent,
    ItButtonDirective,
    ReactiveFormsModule,
    ItTextareaComponent,
    TextMetricsComponent,
  ]
})
export class DocumentAnalyzerComponent {
  protected readonly FormUtils = FormUtils;

  public analyzerForm: FormGroup;

  public text!: string;
  public result!: TextMetrics;


  constructor(private alertService: AlertService,
              private analysisService: AnalysisService) {
    this.analyzerForm = new FormGroup({
      text: new FormControl('', Validators.required),
    });
  }

  public analyze(): void {
    this.analyzerForm.markAllAsTouched();
    if (this.analyzerForm.invalid) {
      this.alertService.showError('Errore', 'Compilare tutti i campi');
      return;
    }

    const textToAnalyze = this.analyzerForm.value.text;
    this.analysisService.textAnalysis(textToAnalyze)
      .subscribe({
        next: (result) => {
          this.text = textToAnalyze;
          this.result = result.textEvaluation;
        },
        error: (error) => {
          this.alertService.showError('Errore', error.error);
        }
      });
  }

}
