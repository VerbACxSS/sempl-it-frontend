import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ItCardComponent,
  ItCheckboxComponent,
  ItIconComponent
} from 'design-angular-kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMetrics} from '../../model/Metrics';
import {NgxEchartsDirective} from 'ngx-echarts';
import {EChartsCoreOption} from 'echarts';
import {ChartUtils} from "../../utils/ChartUtils";
import {TextAnnotationComponent} from '../text-annotation/text-annotation.component';
import {Annotation, TextAnnotation} from '../../model/Annotation';
import {AnnotationUtils} from '../../utils/AnnotationUtils';
import {TokensInfoModalComponent} from '../modals/tokens-info-modal/tokens-info-modal.component';
import {TypesInfoModalComponent} from '../modals/types-info-modal/types-info-modal.component';
import {SentencesInfoModalComponent} from '../modals/sentences-info-modal/sentences-info-modal.component';
import {GulpeaseInfoModalComponent} from '../modals/gulpease-info-modal/gulpease-info-modal.component';
import {TtrInfoModalComponent} from '../modals/ttr-info-modal/ttr-info-modal.component';
import {LexicalDensityInfoModalComponent} from '../modals/lexical-density-info-modal/lexical-density-info-modal.component';
import {FleschVaccaInfoModalComponent} from '../modals/flesch-vacca-info-modal/flesch-vacca-info-modal.component';
import {EasyTokensInfoModalComponent} from '../modals/easy-tokens-info-modal/easy-tokens-info-modal.component';
import {LatinismsInfoModalComponent} from '../modals/latinisms-info-modal/latinisms-info-modal.component';
import {
  DifficultConnectivesInfoModalComponent
} from '../modals/difficult-connectives-info-modal/difficult-connectives-info-modal.component';
import {ActiveVerbsInfoModalComponent} from '../modals/active-verbs-info-modal/active-verbs-info-modal.component';
import {PassiveVerbsInfoModalComponent} from '../modals/passive-verbs-info-modal/passive-verbs-info-modal.component';
import {
  ReflectiveVerbsInfoModalComponent
} from '../modals/reflective-verbs-info-modal/reflective-verbs-info-modal.component';
import {PosInfoModalComponent} from '../modals/pos-info-modal/pos-info-modal.component';
import {LemmasInfoModalComponent} from '../modals/lemmas-info-modal/lemmas-info-modal.component';
import {CharactersInfoModalComponent} from '../modals/characters-info-modal/characters-info-modal.component';


interface Filter {
  label: string
  posLabel: string
  color: string,
  value: boolean
}

@Component({
  standalone: true,
  selector: 'app-text-metrics',
  styleUrl: './text-metrics.component.scss',
  templateUrl: './text-metrics.component.html',
  imports: [
    ItIconComponent,
    ItCardComponent,
    ReactiveFormsModule,
    NgxEchartsDirective,
    TextAnnotationComponent,
    TokensInfoModalComponent,
    TypesInfoModalComponent,
    SentencesInfoModalComponent,
    GulpeaseInfoModalComponent,
    TtrInfoModalComponent,
    LexicalDensityInfoModalComponent,
    FleschVaccaInfoModalComponent,
    EasyTokensInfoModalComponent,
    LatinismsInfoModalComponent,
    DifficultConnectivesInfoModalComponent,
    ActiveVerbsInfoModalComponent,
    PassiveVerbsInfoModalComponent,
    ReflectiveVerbsInfoModalComponent,
    PosInfoModalComponent,
    LemmasInfoModalComponent,
    CharactersInfoModalComponent,
    ItCheckboxComponent,
    FormsModule,
  ]
})
export class TextMetricsComponent implements OnChanges {
  public readonly DEFAULT_POS_CHART_OPTION = ChartUtils.defaultPosChart();
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

  @Input() text!: string;
  @Input() textMetrics!: TextMetrics;

  public barChartOptions!: EChartsCoreOption;
  public fleschChartOptions!: EChartsCoreOption;
  public gulpeaseChartOptions!: EChartsCoreOption;

  public annotations!: TextAnnotation;

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.annotations = AnnotationUtils.parseAnnotations(this.textMetrics);

    this.barChartOptions = {
      series: [
        {
          type: 'bar',
          color: '#0066CC',
          data: [
            this.textMetrics.posEvaluation.nNouns + this.textMetrics.posEvaluation.nProperNouns,
            this.textMetrics.posEvaluation.nVerbs,
            this.textMetrics.posEvaluation.nAdjectives,
            this.textMetrics.posEvaluation.nPronouns,
            this.textMetrics.posEvaluation.nArticles,
            this.textMetrics.posEvaluation.nAdverbs,
            this.textMetrics.posEvaluation.nPrepositions,
            this.textMetrics.posEvaluation.nCoordinatingConjunctions + this.textMetrics.posEvaluation.nSubordinatingConjunctions,
            this.textMetrics.posEvaluation.nOther + this.textMetrics.posEvaluation.nParticles + this.textMetrics.posEvaluation.nPunctuations + this.textMetrics.posEvaluation.nInterjections + this.textMetrics.posEvaluation.nNumber + this.textMetrics.posEvaluation.nSymbols
          ],
          label: {
            show: true,
            position: 'inside',
            color: '#FFFFFF'
          }
        },
      ]
    };
    this.gulpeaseChartOptions = {
      series: [
        {
          data: [
            {
              value: Math.round(this.textMetrics.readabilityEvaluation.gulpease),
              itemStyle: {
                color: '#0066CC'
              }
            }
          ]
        }
      ]
    };
    this.fleschChartOptions = {
      series: [
        {
          data: [
            {
              value: Math.round(this.textMetrics.readabilityEvaluation.fleschVacca),
              itemStyle: {
                color: '#0066CC'
              }
            }
          ]
        }
      ]
    };
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
