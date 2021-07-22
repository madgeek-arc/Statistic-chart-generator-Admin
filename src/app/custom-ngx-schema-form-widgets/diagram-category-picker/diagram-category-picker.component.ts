import { Component, OnDestroy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { ControlWidget, FormProperty } from 'ngx-schema-form';
import { DiagramCategoryService } from '../../services/diagram-category-service/diagram-category.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { TabActivationStatusService } from '../../services/tab-activation-status-service/tab-activation-status.service';
import { FormSchema } from '../../chart-creator/chart-form-schema.model';
import {DynamicFormHandlingService} from '../../services/dynamic-form-handling-service/dynamic-form-handling.service';

@Component({
  selector: 'diagram-category-picker',
  templateUrl: './diagram-category-picker.component.html',
  styleUrls: ['./diagram-category-picker.component.scss']
})
export class DiagramCategoryPickerComponent extends ControlWidget implements CardPicker, OnDestroy, AfterContentInit {

  // fs: FormSchema;

  get diagramInitialised(): boolean {
    return this.formProperty.value !== null &&
    this.formProperty.value !== undefined &&
    this.formProperty.value !== '';
  }

  subscriptions: Array<Subscription> = [];
  isPolarFormProperty: FormProperty;

  constructor(public diagramCategoryService: DiagramCategoryService,
              private cdr: ChangeDetectorRef, private tabActivationStatusService: TabActivationStatusService,
              public dynamicFormHandlingService: DynamicFormHandlingService) {
    super();
  }

  ngAfterContentInit() {
    // Get a reference to if the selected diagram is polar
    this.isPolarFormProperty = this.formProperty.parent.properties['isPolarDiagram'];

    this.subscriptions.push(
      (<BehaviorSubject<string>> this.formProperty.valueChanges)
      .subscribe(diagram => {
        this.diagramCategoryService.changeDiagramCategory(diagram);

        // Change the requirement of XAxis in order to accomodate the Numbers "chart"
        this.dynamicFormHandlingService.changeRequirementOfXAxis(diagram !== 'numbers');
         
        this.cdr.markForCheck();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( suscription => {
        suscription.unsubscribe();
    });
  }

  diagramSelectionAction(diagram: string, isPolar = false) {

    // Changes active tab to the next
    this.tabActivationStatusService.activeId = this.tabActivationStatusService.tabIds[2];

    if ( this.formProperty.value !== diagram || (this.isPolarFormProperty.value as boolean) !== isPolar) 
    {
      this.formProperty.setValue(diagram, false);
      this.isPolarFormProperty.setValue(isPolar, false);
    }
  }

  isDiagramSelected(diagram: string, isPolar = false): boolean { return diagram === this.formProperty.value && isPolar === this.isPolarFormProperty.value; }

  setSelectedCardStyle(isSelected: boolean) {
    if (isSelected) {
      return {border: 'solid', color: '#2185d0', 'border-radius': '0.5em' };
    }
    return {border: 'none'};
  }
}

export interface CardPicker {

  setSelectedCardStyle(isSelected: boolean): Object;
}
