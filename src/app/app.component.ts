import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartCreatorComponent } from './chart-creator/chart-creator.component';
import { UrlProviderService } from './services/url-provider-service/url-provider.service';
import { ChartExportingService } from './services/chart-exporting-service/chart-exporting.service';
import { IPopup, PopupPlacement } from 'ng2-semantic-ui';
import { SuiPopup } from 'ng2-semantic-ui/dist';
import { ChartLoadingService } from './services/chart-loading-service/chart-loading.service';
import { DynamicFormHandlingService } from './services/dynamic-form-handling-service/dynamic-form-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(ChartCreatorComponent) childChartCreator;

  private _publishPopUpCondition: boolean;
  private _exportPopUpCondition: boolean;

  chartModel: Object;
  loadedChartFile: File = null;

  activePopUp: SuiPopup;

  popupPlacement = PopupPlacement.Bottom;

  constructor(private urlProvider: UrlProviderService,
    protected chartExportingService: ChartExportingService,
    protected chartLoadingService: ChartLoadingService,
    public dfhs: DynamicFormHandlingService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Popup is closed initially
    this._publishPopUpCondition = false;
  }

  handlePopUpOpen(event: any) {
    console.log(event);
  }

  public togglePublishPopUp(popup: IPopup) {
    this.dfhs.publishURLS();
    popup.toggle();
  }

  public exportChart(popup: IPopup) {

    if (!(this.childChartCreator instanceof ChartCreatorComponent)) {
      console.error('childChartCreator not an instance of ChartCreatorComponent');
      return;
    }

    if (!this._exportPopUpCondition) {
      this.dfhs.exportForm();
    }
    popup.toggle();
  }

  public initiateFilePicker() {
    const fileElem = document.getElementById('fileElem');
    if (fileElem) {
      fileElem.click();
    }
  }
}
