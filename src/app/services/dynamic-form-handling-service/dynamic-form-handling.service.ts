import { Injectable } from '@angular/core';
import { SCGAFormSchema } from '../../chart-creator/chart-form-schema.classes';
import { FormProperty } from 'ngx-schema-form/lib/model/formproperty';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { DiagramCreator } from './dynamic-form-handling-diagram-creator';
import { ChartExportingService } from '../chart-exporting-service/chart-exporting.service';
import { ChartLoadingService } from '../chart-loading-service/chart-loading.service';
import { DiagramCategoryService } from '../diagram-category-service/diagram-category.service';
import {FormSchema} from '../../chart-creator/chart-form-schema.model';
import { first } from 'rxjs/operators';
import { HighChartsChart } from '../supported-libraries-service/chart-description-HighCharts.model';
import { GoogleChartsChart, GoogleChartsTable } from '../supported-libraries-service/chart-description-GoogleCharts.model';
import { HighMapsMap } from '../supported-libraries-service/chart-description-HighMaps.model';
import { EChartsChart } from '../supported-libraries-service/chart-description-eCharts.model';
import { RawChartDataModel } from '../supported-libraries-service/chart-description-rawChartData.model';
import { RawDataModel } from '../supported-libraries-service/description-rawData.model';
@Injectable({
  providedIn: 'root'
})
export class DynamicFormHandlingService {

  private _chartObject = undefined;
  private _tableObject = undefined;
  private _rawChartDataObject = undefined;
  private _rawDataObject = undefined;
  private _resetFormValue = null;
  private _formSchemaObject: BehaviorSubject<SCGAFormSchema>;
  private _formErrorObject: BehaviorSubject<Array<any>> = null;
  private _loadFormObject: Object;
  private _loadFormObjectFile: File = null;

  private _diagramCreator: DiagramCreator;

  private _formSchema: FormSchema;

  // fixme when find another solution
  private _xAxisRequired: boolean = false;

  constructor(private diagramcategoryService: DiagramCategoryService,
    private chartExportingService: ChartExportingService,
    private chartLoadingService: ChartLoadingService) {

    this._diagramCreator = new DiagramCreator(diagramcategoryService);
    this._formErrorObject = new BehaviorSubject([]);
    this._formSchemaObject = new BehaviorSubject(null);

    this._formSchema = new FormSchema();
  }

  set resetFormValue(value: SCGAFormSchema) { this._resetFormValue = value; }
  get isFormValid(): boolean {
    if (this.$formErrorObject.value === null) {
      return true;
    } else if (!this._xAxisRequired && this.isOnlyxAxisRequirementError()) {
      return true;
    } else {
      return false;
    }
    // return this.$formErrorObject.value === null;
  }
  set formSchemaObject(value: SCGAFormSchema) { this._formSchemaObject.next(value); }
  get formSchemaObject(): SCGAFormSchema { return this._formSchemaObject.getValue(); }
  get diagramCreator(): DiagramCreator { return this.diagramCreator; }
  get $formErrorObject(): BehaviorSubject<Array<any>> { return this._formErrorObject; }
  get ChartObject(): Object { return this._chartObject; }
  get TableObject(): Object { return this._tableObject; }
  get RawChartDataObject(): Object { return this._rawChartDataObject; }
  get RawDataObject(): Object { return this._rawDataObject; }
  get loadFormObject(): Object { return this._loadFormObject; }
  get loadFormObjectFile(): File { return this._loadFormObjectFile; }
  get formSchema(): FormSchema { return this._formSchema; }
  get isxAxisRequired(): boolean { return this._xAxisRequired; }

  resetForm(root: FormProperty) {
    // Reset through the root property of the dynamic form
    root.reset(this._resetFormValue, false);
    
    // Reset table and chart objects
    this._chartObject = undefined;
    this.chartExportingService.changeChartUrl(this._chartObject);

    this._tableObject = undefined;
    this.chartExportingService.changeTableUrl(this._tableObject);

    this._rawChartDataObject = undefined;
    this.chartExportingService.changeRawChartDataUrl(this._rawChartDataObject);
    
    this._rawDataObject = undefined;
    this.chartExportingService.changeRawDataUrl(this._rawDataObject);
  }

  loadForm(event: any) {
    // console.log('Load Event', event);
    this._loadFormObjectFile = null;

    if (!(event === null || event === undefined) ) {
      const fr: FileReader = new FileReader();

      fr.onload = () => this._loadFormObject = JSON.parse(<string>fr.result)
      fr.onloadstart = () => this.chartLoadingService.chartLoadingStatus = true
      fr.onloadend = () => this._loadFormObjectFile = event.target.files[0]

      fr.readAsText(event.target.files[0]);
    }
  }
  
  resetLoadForm() {
    this._loadFormObjectFile = null;
    this.chartLoadingService.isChartLoaded = false;
  }

  public submitForm() {
    console.log('Submitted this form', this.formSchemaObject);

    if (this.formSchemaObject !== null && this.isFormValid)
      this.createDataObjectsFromSchemaObject(this.formSchemaObject);
  }

  private createDataObjectsFromSchemaObject(value: SCGAFormSchema) {
    
    if(this.diagramcategoryService.selectedDiagramCategory$.value?.type === "numbers")
    {
      this._diagramCreator.createRawData(value).pipe(first()).subscribe(rawDataObject => this.changeDataObjects(null,null,null,rawDataObject))
      return;
    }

    forkJoin([this._diagramCreator.createChart(value), this._diagramCreator.createTable(value),
      this._diagramCreator.createRawChartData(value), this._diagramCreator.createRawData(value)])
      .pipe(first())
      .subscribe(([chartObject, tableObject, rawChartDataObject, rawDataObject]) => 
      this.changeDataObjects(chartObject, tableObject, rawChartDataObject, rawDataObject));
  }

  public publishURLS() {
    console.log('Publish this form', this.formSchemaObject);

    if(!this.isFormValid)
      this.changeDataObjects(null, null, null, null);

    if (this.formSchemaObject !== null && this.isFormValid)
      this.createDataObjectsFromSchemaObject(this.formSchemaObject);
  }

  public exportForm() { this.createAndDownloadJSON(this.formSchemaObject, 'chart.json'); }

  public createAndDownloadJSON(jsonObj: Object, filename: string) {

    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonObj)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  changeRequirementOfXAxis(required: boolean) {
    
    this._xAxisRequired = required;
    
    if (this._xAxisRequired) {
      this._formSchema.dataseriesFormSchema.items.properties.data.fieldsets[0].fields = ['yaxisData', 'xaxisData'];
      this._formSchema.dataseriesFormSchema.items.properties.data.required = ['yAxisData', 'xAxisData', 'filters'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.required = ['xaxisEntityField'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.minItems = 1;
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData
      .items.properties.xaxisEntityField.requiredField = true;
    } else {
      // this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.widget = 'hidden';
      this._formSchema.dataseriesFormSchema.items.properties.data.fieldsets[0].fields = ['yaxisData'];
      this._formSchema.dataseriesFormSchema.items.properties.data.required = ['yAxisData', 'filters'];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.items.required = [];
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData.minItems = 0;
      this._formSchema.dataseriesFormSchema.items.properties.data.properties.xaxisData
      .items.properties.xaxisEntityField.requiredField = false;
    }
  }

  printLogs() {
    console.log('this._formSchema --> ', this._formSchema);
    console.log('this._formErrorObject -->', this._formErrorObject);
  }

  isOnlyxAxisRequirementError() {

    for (const value of this._formErrorObject.getValue())
      if (value.code !== 'ARRAY_LENGTH_SHORT' || !value.path.endsWith('/data/xaxisData'))
        return false;
      
    return true;
  }

  private changeDataObjects(chartObject: HighChartsChart | GoogleChartsChart | HighMapsMap | EChartsChart,
    tableObject: GoogleChartsTable, rawChartDataObject: RawChartDataModel, rawDataObject: RawDataModel)
  {
    this._chartObject = chartObject;
    this.chartExportingService.changeChartUrl(chartObject);

    this._tableObject = tableObject;
    this.chartExportingService.changeTableUrl(tableObject);

    this._rawChartDataObject = rawChartDataObject;
    this.chartExportingService.changeRawChartDataUrl(rawChartDataObject);

    this._rawDataObject = rawDataObject;
    this.chartExportingService.changeRawDataUrl(rawDataObject);
  }
}
