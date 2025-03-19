export interface Span {
  start: number;
  end: number;
  text: string;
}

export interface BasicMetrics {
  tokens: Array<string>;
  tokens_all: Array<string>;
  chars: Array<string>;
  charsAll: Array<string>;
  syllables: Array<string>;
  words: Array<string>;
  lemmas: Array<string>;
  uniqueLemmas: Array<string>;
  sentences: Array<string>;

  nTokens: number;
  nTokensAll: number;
  nChars: number;
  nCharsAll: number;
  nSyllables: number;
  nWords: number;
  nUniqueLemmas: number;
  nSentences: number;
}

export interface PosMetrics {
  other: Array<Span>;
  nouns: Array<Span>;
  verbs: Array<Span>;
  number: Array<Span>;
  symbols: Array<Span>;
  adverbs: Array<Span>;
  articles: Array<Span>;
  pronouns: Array<Span>;
  particles: Array<Span>;
  adjectives: Array<Span>;
  prepositions: Array<Span>;
  properNouns: Array<Span>;
  punctuations: Array<Span>;
  interjections: Array<Span>;
  coordinatingConjunctions: Array<Span>;
  subordinatingConjunctions: Array<Span>;

  nOther: number;
  nNouns: number;
  nVerbs: number;
  nNumber: number;
  nSymbols: number;
  nAdverbs: number;
  nArticles: number;
  nPronouns: number;
  nParticles: number;
  nAdjectives: number;
  nPrepositions: number;
  nProperNouns: number;
  nPunctuations: number;
  nInterjections: number;
  nCoordinatingConjunctions: number;
  nSubordinatingConjunctions: number;
}

export interface VerbMetrics {
  verbs: Array<Span>;
  activeVerbs: Array<Span>;
  passiveVerbs: Array<Span>;
  reflectiveVerbs: Array<Span>;

  nVerbs: number;
  nActiveVerbs: number;
  nPassiveVerbs: number;
  nReflectiveVerbs: number;
}

export interface LexiconMetrics {
  juridicalExpressions: Array<Span>;
  difficultConnectives: Array<Span>;
  latinisms: Array<Span>;
  easyTokens: Array<Span>;
  easyFoTokens: Array<Span>;
  easyAuTokens: Array<Span>;
  easyAdTokens: Array<Span>;

  nJuridicalExpressions: number;
  nDifficultConnectives: number;
  nLatinisms: number;
  nEasyTokens: number;
  nEasyFoTokens: number;
  nEasyAuTokens: number;
  nEasyAdTokens: number;
}

export interface ReadabilityMetrics {
  ttr: number;
  gulpease: number;
  fleschVacca: number;
  lexicalDensity: number;
}

export interface SimilarityMetrics {
  semanticSimilarity: number;
}

export interface DiffMetrics {
  editDistance: number;
  nAddedTokens: number;
  nDeletedTokens: number;
}

export interface TextMetrics {
  basicEvaluation: BasicMetrics;
  posEvaluation: PosMetrics;
  verbsEvaluation: VerbMetrics;
  lexiconEvaluation: LexiconMetrics;
  readabilityEvaluation: ReadabilityMetrics;
}
