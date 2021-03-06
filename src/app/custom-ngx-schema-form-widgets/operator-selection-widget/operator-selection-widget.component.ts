import { Component, AfterContentInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlWidget } from 'ngx-schema-form';
import { SupportedFilterTypesService, FilterType, FieldType } from '../../services/supported-filter-types-service/supported-filter-types.service';
import { Subscription, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { FieldNode } from '../../form-components/select-attribute/dynamic-entity-tree/entity-tree-nodes.types';

@Component({
  selector: 'operator-selection-widget',
  templateUrl: './operator-selection-widget.component.html',
  styleUrls: ['./operator-selection-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorSelectionWidgetComponent extends ControlWidget implements OnDestroy, AfterContentInit {

  private selectedField: FieldNode = null;
  operators: Observable<Array<FilterType>> = null ;

  private entityFieldSub: Subscription;

  constructor(private operatorsService: SupportedFilterTypesService, private cdr: ChangeDetectorRef) {
    super();
   }

  ngAfterContentInit() {

    const dependentProperty = this.formProperty.searchProperty('field');

    this.entityFieldSub = dependentProperty.valueChanges.asObservable().pipe(distinctUntilChanged()).subscribe(
      (field: FieldNode) => { this.fieldChanged(field); }
      // error => this.error = error // error path
    );
  }

  ngOnDestroy() {
    this.entityFieldSub.unsubscribe();
  }

  getOperatorsOfType(type: FieldType): Observable<Array<FilterType>> {
    this.operators =  this.operatorsService.getFiltersOfType(type).pipe(distinctUntilChanged());
    return this.operators;
  }

  fieldChanged(field: FieldNode) {
    if (!field) {
      // Reset the operator
      this.control.setValue(null);
      return;
    }

    if (this.selectedField === null || FieldType[field.type] !== FieldType[this.selectedField.type] ) {

      // console.log('FieldType Changed : ' + FieldType[field.type]);
      // console.log(field);

      this.getOperatorsOfType(FieldType[field.type]);
      this.selectedField = field;
      // Reset the operator
      this.control.setValue(null);

      // Let Angular know that the entities have changed
      this.cdr.markForCheck();
    } else if ( field.name !== this.selectedField.name) {
      this.selectedField = field;
    }
  }

  operatorChanged(operatorValue: string) {

    console.log('Operator Changed: ' + operatorValue);
  }

}
