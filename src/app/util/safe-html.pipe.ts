import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safe_html' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}