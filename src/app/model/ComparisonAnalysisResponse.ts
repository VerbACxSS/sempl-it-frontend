import {DiffMetrics, SimilarityMetrics, TextMetrics} from './Metrics';

export interface ComparisonAnalysisResponse {
  metrics1: TextMetrics;
  metrics2: TextMetrics;
  similarity: SimilarityMetrics;
  diff: DiffMetrics;
}
