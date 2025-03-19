export class Annotation {
  startIndex: number;
  endIndex: number;
  text: string | undefined;
  label: string;
  color: string;

  constructor(startIndex: number, endIndex: number, label: string, color: string) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.label = label;
    this.color = color;
  }
}

export interface TextAnnotation {
  pos: Array<Annotation>,
  verbs: Array<Annotation>,
  lexicon: Array<Annotation>
}
