import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ItCardComponent, ItCheckboxComponent,
  ItIconComponent,
  ItTabContainerComponent,
  ItTabItemComponent,
  ItTooltipDirective
} from 'design-angular-kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsDirective} from 'ngx-echarts';
import {EChartsCoreOption} from 'echarts';
import {DiffMetrics, SimilarityMetrics, TextMetrics} from '../../model/Metrics';
import {NgClass} from '@angular/common';
import {ChartUtils} from "../../utils/ChartUtils";
import {TextAnnotationComponent} from '../text-annotation/text-annotation.component';
import {Annotation, TextAnnotation} from '../../model/Annotation';
import {AnnotationUtils} from '../../utils/AnnotationUtils';
import {ActiveVerbsInfoModalComponent} from '../modals/active-verbs-info-modal/active-verbs-info-modal.component';
import {CharactersInfoModalComponent} from '../modals/characters-info-modal/characters-info-modal.component';
import {
    DifficultConnectivesInfoModalComponent
} from '../modals/difficult-connectives-info-modal/difficult-connectives-info-modal.component';
import {EasyTokensInfoModalComponent} from '../modals/easy-tokens-info-modal/easy-tokens-info-modal.component';
import {FleschVaccaInfoModalComponent} from '../modals/flesch-vacca-info-modal/flesch-vacca-info-modal.component';
import {GulpeaseInfoModalComponent} from '../modals/gulpease-info-modal/gulpease-info-modal.component';
import {LatinismsInfoModalComponent} from '../modals/latinisms-info-modal/latinisms-info-modal.component';
import {LemmasInfoModalComponent} from '../modals/lemmas-info-modal/lemmas-info-modal.component';
import {
    LexicalDensityInfoModalComponent
} from '../modals/lexical-density-info-modal/lexical-density-info-modal.component';
import {PassiveVerbsInfoModalComponent} from '../modals/passive-verbs-info-modal/passive-verbs-info-modal.component';
import {PosInfoModalComponent} from '../modals/pos-info-modal/pos-info-modal.component';
import {
    ReflectiveVerbsInfoModalComponent
} from '../modals/reflective-verbs-info-modal/reflective-verbs-info-modal.component';
import {SentencesInfoModalComponent} from '../modals/sentences-info-modal/sentences-info-modal.component';
import {TokensInfoModalComponent} from '../modals/tokens-info-modal/tokens-info-modal.component';
import {TtrInfoModalComponent} from '../modals/ttr-info-modal/ttr-info-modal.component';
import {TypesInfoModalComponent} from '../modals/types-info-modal/types-info-modal.component';
import {
  SemanticSimilarityInfoModalComponent
} from '../modals/semantic-similarity-info-modal/semantic-similarity-info-modal.component';
import {EditDistanceInfoModalComponent} from '../modals/edit-distance-info-modal/edit-distance-info-modal.component';
import {AddedTokensInfoModalComponent} from '../modals/added-tokens-info-modal/added-tokens-info-modal.component';
import {DeletedTokensInfoModalComponent} from '../modals/deleted-tokens-info-modal/deleted-tokens-info-modal.component';

interface Filter {
  label: string
  posLabel: string
  color: string,
  value: boolean
}

@Component({
  standalone: true,
  selector: 'app-text-comparator',
  styleUrl: './text-comparator.component.scss',
  templateUrl: './text-comparator.component.html',
  imports: [
    NgClass,
    ItCardComponent,
    ItTabItemComponent,
    ItTooltipDirective,
    ReactiveFormsModule,
    NgxEchartsDirective,
    ItTabContainerComponent,
    TextAnnotationComponent,
    ActiveVerbsInfoModalComponent,
    CharactersInfoModalComponent,
    DifficultConnectivesInfoModalComponent,
    EasyTokensInfoModalComponent,
    FleschVaccaInfoModalComponent,
    GulpeaseInfoModalComponent,
    LatinismsInfoModalComponent,
    LemmasInfoModalComponent,
    LexicalDensityInfoModalComponent,
    PassiveVerbsInfoModalComponent,
    PosInfoModalComponent,
    ReflectiveVerbsInfoModalComponent,
    SentencesInfoModalComponent,
    TokensInfoModalComponent,
    TtrInfoModalComponent,
    TypesInfoModalComponent,
    ItIconComponent,
    SemanticSimilarityInfoModalComponent,
    EditDistanceInfoModalComponent,
    AddedTokensInfoModalComponent,
    DeletedTokensInfoModalComponent,
    ItCheckboxComponent,
    FormsModule,
  ],
})
export class TextComparatorComponent implements OnChanges {
  public DEFAULT_POS_CHART_OPTION = ChartUtils.defaultPosChart();
  public readonly DEFAULT_FLESCH_CHART_OPTION = ChartUtils.defaultFleschChart();
  public readonly DEFAULT_GULPEASE_CHART_OPTION = ChartUtils.defaultGulpeaseChart();

  public POS_FILTER: Array<Filter> = [
    {label: 'Nomi', posLabel: "NOME", color: "blue", value: true},
    {label: 'Verbi', posLabel: "VERBO", color: "red", value: false},
    {label: 'Aggettivi', posLabel: "AGGETTIVO", color: "green", value: false},
    {label: 'Pronomi', posLabel: "PRONOME", color: "orange", value: false},
    {label: 'Articoli', posLabel: "ARTICOLO", color: "purple", value: false},
    {label: 'Avverbi', posLabel: "AVVERBIO", color: "pink", value: false},
    {label: 'Preposizioni', posLabel: "PREPOSIZIONE", color: "#FFD700", value: false},
    {label: 'Congiunzioni', posLabel: "CONGIUNZIONE", color: "brown", value: false},
  ];

  public VERBS_FILTER: Array<Filter> = [
    {label: 'Verbi attivi', posLabel: "ATTIVO", color: "green", value: true},
    {label: 'Verbi passivi', posLabel: "PASSIVO", color: "red", value: true},
    {label: 'Verbi riflessivi | impersonali', posLabel: "RIFLESSIVO", color: "orange", value: true}
  ];

  public LEXICON_FILTER: Array<Filter> = [
    {label: 'Vocabolario di base', posLabel: "BASE", color: "green", value: false},
    {label: 'Connettivi difficili', posLabel: "CONN. DIFF.", color: "red", value: true},
    {label: 'Latinismi', posLabel: "LATINISMO", color: "orange", value: true},
  ];

  public barChartOptions!: EChartsCoreOption;
  public fleschChartOptions!: EChartsCoreOption;
  public gulpeaseChartOptions!: EChartsCoreOption;

  public annotationsText1!: TextAnnotation;
  public annotationsText2!: TextAnnotation;

  @Input() text1!: string;
  @Input() text2!: string;
  @Input() metrics1!: TextMetrics;
  @Input() metrics2!: TextMetrics;
  @Input() similarity!: SimilarityMetrics;
  @Input() diff!: DiffMetrics;

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.annotationsText1 = AnnotationUtils.parseAnnotations(this.metrics1);
    this.annotationsText2 = AnnotationUtils.parseAnnotations(this.metrics2);

    this.barChartOptions = {
      series: [
        {
          name: "ORIGINALE",
          type: "bar",
          color: '#0066CC',
          data: [
            this.metrics1.posEvaluation.nNouns + this.metrics1.posEvaluation.nProperNouns,
            this.metrics1.posEvaluation.nVerbs,
            this.metrics1.posEvaluation.nAdjectives,
            this.metrics1.posEvaluation.nPronouns,
            this.metrics1.posEvaluation.nArticles,
            this.metrics1.posEvaluation.nAdverbs,
            this.metrics1.posEvaluation.nPrepositions,
            this.metrics1.posEvaluation.nCoordinatingConjunctions + this.metrics1.posEvaluation.nSubordinatingConjunctions,
            this.metrics1.posEvaluation.nOther + this.metrics1.posEvaluation.nParticles + this.metrics1.posEvaluation.nPunctuations + this.metrics1.posEvaluation.nInterjections + this.metrics1.posEvaluation.nNumber + this.metrics1.posEvaluation.nSymbols
          ],
          label: {
            show: true,
            position: 'inside',
            color: '#FFFFFF'
          }
        },
        {
          name: "SEMPLIFICATO",
          type: "bar",
          color: '#17A398',
          data: [
            this.metrics2.posEvaluation.nNouns + this.metrics2.posEvaluation.nProperNouns,
            this.metrics2.posEvaluation.nVerbs,
            this.metrics2.posEvaluation.nAdjectives,
            this.metrics2.posEvaluation.nPronouns,
            this.metrics2.posEvaluation.nArticles,
            this.metrics2.posEvaluation.nAdverbs,
            this.metrics2.posEvaluation.nPrepositions,
            this.metrics2.posEvaluation.nCoordinatingConjunctions + this.metrics2.posEvaluation.nSubordinatingConjunctions,
            this.metrics2.posEvaluation.nOther + this.metrics2.posEvaluation.nParticles + this.metrics2.posEvaluation.nPunctuations + this.metrics2.posEvaluation.nInterjections + this.metrics2.posEvaluation.nNumber + this.metrics2.posEvaluation.nSymbols
          ],
          label: {
            show: true,
            position: 'inside',
            color: '#FFFFFF'
          }
        }
      ]
    };
    this.gulpeaseChartOptions = {
      series: [
        {
          data : [
            {
              value: Math.round(this.metrics1.readabilityEvaluation.gulpease),
              name: 'ORIGINALE',
              title: {
                backgroundColor: '#0066CC',
                offsetCenter: ['-40%', '75%'],
              },
              detail: {
                offsetCenter: ['-40%', '90%'],
              },
              itemStyle: {
                color: '#0066CC'
              }
            },
            {
              value: Math.round(this.metrics2.readabilityEvaluation.gulpease),
              name: 'SEMPLIFICATO',
              title: {
                backgroundColor: '#17A398',
                offsetCenter: ['40%', '75%'],
              },
              detail: {
                offsetCenter: ['40%', '90%'],
              },
              itemStyle: {
                color: '#17A398'
              }
            },
          ]
        }
      ]
    };
    this.fleschChartOptions = {
      series: [
        {
          data : [
            {
              value: Math.round(this.metrics1.readabilityEvaluation.fleschVacca),
              name: 'ORIGINALE',
              title: {
                backgroundColor: '#0066CC',
                offsetCenter: ['-40%', '75%']
              },
              detail: {
                offsetCenter: ['-40%', '90%']
              },
              itemStyle: {
                color: '#0066CC'
              }
            },
            {
              value: Math.round(this.metrics2.readabilityEvaluation.fleschVacca),
              name: 'SEMPLIFICATO',
              title: {
                backgroundColor: '#17A398',
                offsetCenter: ['40%', '75%']
              },
              detail: {
                offsetCenter: ['40%', '90%']
              },
              itemStyle: {
                color: '#17A398'
              }
            },
          ]
        }
      ]
    };
  }

  public evalDelta(value1: number, value2: number): number | '-' {
    if (value1 === 0) {
      return value2 === 0 ? '-' : 100;
    }
    return Math.round((value2 - value1) / value1 * 100.0);
  }

  public evalDeltaClass(value1: number, value2: number): string {
    const delta = this.evalDelta(value1, value2);
    if (delta === '-' || delta === 0) {
      return 'no-increment';
    }
    return delta > 0 ? 'positive-increment' : 'negative-increment';
  }

  public evalRate(value: number, total: number): string {
    if (total === 0) {
      return '- %';
    }
    return Math.round(value / total * 100.0) + ' %';
  }

  public filterAnnotations(annotations: Array<Annotation>, posFilters: Array<Filter>): Array<Annotation> {
    let filteredAnnotations: Array<Annotation> = [];
    for (const posFilter of posFilters) {
      if (posFilter.value) {
        filteredAnnotations = filteredAnnotations.concat(annotations.filter(annotation => annotation.label === posFilter.posLabel));
      }
    }
    return filteredAnnotations;
  }
}
