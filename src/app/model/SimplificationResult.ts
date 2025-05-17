import {DiffMetrics, SimilarityMetrics, TextMetrics} from "./Metrics";

export interface Simplification {
  original: string,
  proofreading: string,
  lex: string,
  connectives: string,
  expressions: string,
  sentence_splitter: string,
  nominalizations: string,
  verbs: string,
  sentence_reorganizer: string,
  explain: string,
}

export interface SimplificationResult {
  simplifiedText: string,
  simplificationSteps: Simplification,
  metrics1: TextMetrics,
  metrics2: TextMetrics,
  similarity: SimilarityMetrics,
  diff: DiffMetrics
}
