import { Component, OnInit, SecurityContext, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UrlProviderService } from '../services/url-provider-service/url-provider.service';

@Component({
  selector: 'chart-data-presentation-table',
  templateUrl: './chart-data-presentation-table.component.html',
  styleUrls: ['./chart-data-presentation-table.component.css']
})
export class ChartDataPresentationTableComponent implements OnInit, OnChanges {

  @Input() table: Object;
  rows: Array<Array<any>>;
  columnHeaders: Array<string>;
  frameUrl: SafeResourceUrl;
  frameHeight: number;

  constructor(private sanitizer: DomSanitizer, private urlProvider: UrlProviderService) {
    this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.getUrl() + '/chart');
  }

  ngOnInit() {

    this.frameHeight = (2 * window.outerHeight) / 5;

  }
  ngOnChanges(changes: SimpleChanges) {

    const stringObj = JSON.stringify(changes.table.currentValue);
    console.log('[table-frame.component] On changes: ' + stringObj);

    if (changes.table.currentValue) {
      this.frameUrl = this.getSanitizedFrameUrl(this.urlProvider.getUrl() + '/chart?json=' + encodeURIComponent(stringObj));
      console.log(this.frameUrl);
    }
  }
  getSanitizedFrameUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
