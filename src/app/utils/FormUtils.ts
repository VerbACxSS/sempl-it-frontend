export class FormUtils {
  static autogrow(e: any): void {
    e.target.style.overflow = 'hidden';
    e.target.style.height = 'auto';
    e.target.style.height = Math.max(134, e.target.scrollHeight) + 'px';
  }
}
