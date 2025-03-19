import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Annotation} from '../../model/Annotation';

@Component({
  standalone: true,
  selector: 'app-text-annotation',
  styleUrl: './text-annotation.component.scss',
  templateUrl: './text-annotation.component.html',
  imports: []
})
export class TextAnnotationComponent implements OnChanges {
  @Input() text: string = '';
  @Input() annotations: Annotation[] = [];

  public highlightedText: { text: string; annotations: Annotation[] }[][] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] || changes['annotations']) {
      this.highlightedText = this.evalHighlightedText();
    }
  }

  public evalHighlightedText() {
    let lines = this.text.split('\n');
    let result: { text: string; annotations: Annotation[] }[][] = [];
    let currentIndex = 0;

    for (let line of lines) {
      let segments: { index: number; annotations: Annotation[] }[] = [];
      let lineResult: { text: string; annotations: Annotation[] }[] = [];
      let activeAnnotations: Annotation[] = [];
      let lastIndex = 0;

      this.annotations.forEach(ann => {
        if (ann.startIndex >= currentIndex && ann.startIndex < currentIndex + line.length) {
          segments.push({ index: ann.startIndex - currentIndex, annotations: [ann] });
        }
        if (ann.endIndex > currentIndex && ann.endIndex <= currentIndex + line.length) {
          segments.push({ index: ann.endIndex - currentIndex, annotations: [] });
        }
      });

      segments.sort((a, b) => a.index - b.index);

      segments.forEach(segment => {
        if (lastIndex < segment.index) {
          let textSegment = line.substring(lastIndex, segment.index);
          lineResult.push({ text: textSegment, annotations: [...activeAnnotations] });
        }
        activeAnnotations = activeAnnotations.filter(a => a.endIndex > segment.index + currentIndex).concat(segment.annotations);
        lastIndex = segment.index;
      });

      if (lastIndex < line.length) {
        let textSegment = line.substring(lastIndex);
        lineResult.push({ text: textSegment, annotations: [...activeAnnotations] });
      }

      result.push(lineResult);
      currentIndex += line.length + 1;
    }

    return result;
  }

}
