import {environment} from '../../environments/environment';

export class Endpoints {
  public static readonly predictionApi = environment.BACKEND_URL + '/api/v1/simplify/'
  public static readonly textAnalysisApi = environment.BACKEND_URL + '/api/v1/analyze/text'
  public static readonly comparisonAnalysisApi = environment.BACKEND_URL + '/api/v1/analyze/comparison'
}
