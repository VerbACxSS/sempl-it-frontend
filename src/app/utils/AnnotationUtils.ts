import {TextMetrics} from '../model/Metrics';
import {Annotation, TextAnnotation} from '../model/Annotation';

export class AnnotationUtils {
  static parseAnnotations(metrics: TextMetrics): TextAnnotation {
    const annotations: TextAnnotation = {
      pos: [],
      verbs: [],
      lexicon: []
    }
    for (const noun of metrics.posEvaluation.nouns) {
      annotations.pos.push(new Annotation(noun.start, noun.end, 'NOME', 'blue'));
    }
    for (const noun of metrics.posEvaluation.properNouns) {
      annotations.pos.push(new Annotation(noun.start, noun.end, 'NOME', 'blue'));
    }
    for (const verb of metrics.posEvaluation.verbs) {
      annotations.pos.push(new Annotation(verb.start, verb.end, 'VERBO', 'red'));
    }
    for (const adj of metrics.posEvaluation.adjectives) {
      annotations.pos.push(new Annotation(adj.start, adj.end, 'AGGETTIVO', 'green'));
    }
    for (const pronoun of metrics.posEvaluation.pronouns) {
      annotations.pos.push(new Annotation(pronoun.start, pronoun.end, 'PRONOME', 'orange'));
    }
    for (const article of metrics.posEvaluation.articles) {
      annotations.pos.push(new Annotation(article.start, article.end, 'ARTICOLO', 'purple'));
    }
    for (const adverb of metrics.posEvaluation.adverbs) {
      annotations.pos.push(new Annotation(adverb.start, adverb.end, 'AVVERBIO', 'pink'));
    }
    for (const preposition of metrics.posEvaluation.prepositions) {
      annotations.pos.push(new Annotation(preposition.start, preposition.end, 'PREPOSIZIONE', '#FFD700'));
    }
    for (const conjunction of metrics.posEvaluation.coordinatingConjunctions) {
      annotations.pos.push(new Annotation(conjunction.start, conjunction.end, 'CONGIUNZIONE', 'brown'));
    }
    for (const conjunction of metrics.posEvaluation.subordinatingConjunctions) {
      annotations.pos.push(new Annotation(conjunction.start, conjunction.end, 'CONGIUNZIONE', 'brown'));
    }

    for (const verb of metrics.verbsEvaluation.activeVerbs) {
      annotations.verbs.push(new Annotation(verb.start, verb.end, 'ATTIVO', 'green'));
    }
    for (const verb of metrics.verbsEvaluation.passiveVerbs) {
      annotations.verbs.push(new Annotation(verb.start, verb.end, 'PASSIVO', 'red'));
    }
    for (const verb of metrics.verbsEvaluation.reflectiveVerbs) {
      annotations.verbs.push(new Annotation(verb.start, verb.end, 'RIFLESSIVO', 'orange'));
    }

    for (const token of metrics.lexiconEvaluation.easyTokens) {
      annotations.lexicon.push(new Annotation(token.start, token.end, 'BASE', 'green'));
    }
    for (const token of metrics.lexiconEvaluation.difficultConnectives) {
      annotations.lexicon.push(new Annotation(token.start, token.end, 'CONN. DIFF.', 'red'));
    }
    for (const token of metrics.lexiconEvaluation.latinisms) {
      annotations.lexicon.push(new Annotation(token.start, token.end, 'LATINISMO', 'orange'));
    }
    return annotations;
  }
}
