import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AtsComponent} from './pages/ats/ats.component';
import {DocumentAnalyzerComponent} from './pages/document-analyzer/document-analyzer.component';
import {DocumentComparisonComponent} from './pages/document-comparison/document-comparison.component';
import {SupportComponent} from './pages/support/support.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ats',
    component: AtsComponent
  },
  {
    path: 'document-analyzer',
    component: DocumentAnalyzerComponent
  },
  {
    path: 'documents-comparison',
    component: DocumentComparisonComponent
  },
  {
    path: 'support',
    component: SupportComponent
  }
];
