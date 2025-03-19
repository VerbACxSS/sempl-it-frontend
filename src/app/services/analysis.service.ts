import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Endpoints} from '../utils/Endpoints';
import {TextAnalysisRequest} from '../model/TextAnalysisRequest';
import {TextAnalysisResponse} from '../model/TextAnalysisResponse';
import {ComparisonAnalysisResponse} from '../model/ComparisonAnalysisResponse';
import {ComparisonAnalysisRequest} from '../model/ComparisonAnalysisRequest';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) {
  }

  public textAnalysis(text: string): Observable<TextAnalysisResponse> {
    const textAnalysisRequest: TextAnalysisRequest = {
      text: text,
    }
    return this.http.post<TextAnalysisResponse>(Endpoints.textAnalysisApi, textAnalysisRequest)
  }

  public comparisonAnalysis(text1: string, text2: string): Observable<ComparisonAnalysisResponse> {
    const analysisRequest: ComparisonAnalysisRequest = {
      text1: text1,
      text2: text2,
    }
    return this.http.post<ComparisonAnalysisResponse>(Endpoints.comparisonAnalysisApi, analysisRequest)
  }
}
