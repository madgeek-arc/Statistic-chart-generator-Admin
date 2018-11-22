import { GeneralPropertiesWidgetComponent } from './general-properties-widget/general-properties-widget.component';
import { PropertyWidgetComponent } from './property-widget/property-widget.component';
import { LibrarySelectionWidgetComponent } from './library-selection-widget/library-selection-widget.component';
import { SelectionWidgetComponent } from './selection-widget/selection-widget.component';
import { ChartTypeSelectionWidgetComponent } from './chart-type-selection-widget/chart-type-selection-widget.component';
import { EntitySelectionWidgetComponent } from './entity-selection-widget/entity-selection-widget.component';
import { AggregateSelectionWidgetComponent } from './aggregate-selection-widget/aggregate-selection-widget.component';
import { EntityFieldSelectionWidgetComponent } from './entity-field-selection-widget/entity-field-selection-widget.component';
import { ArrayWidgetComponent } from './array-widget/array-widget.component';
import { FilterFieldWidgetComponent } from './filter-field-widget/filter-field-widget.component';
import { DefaultWidgetRegistry } from 'ngx-schema-form';
import { OperatorSelectionWidgetComponent } from './operator-selection-widget/operator-selection-widget.component';
import { FilterPropertyWidgetComponent } from './filter-property-widget/filter-property-widget.component';
import { FilterFieldArrayWidgetComponent } from './filter-field-array-widget/filter-field-array-widget.component';
import { ProfilePickerComponent } from './profile-picker/profile-picker.component';
import { TabularMenuWidgetComponent } from './tabular-menu-widget/tabular-menu-widget.component';
import { HeadMenuWidgetComponent } from './head-menu-widget/head-menu-widget.component';

export class CustomWidgetRegistry extends DefaultWidgetRegistry {
  constructor() {
    super();

    this.register('csui-general-properties-object',  GeneralPropertiesWidgetComponent);
    this.register('csui-property-object',  PropertyWidgetComponent);
    this.register('csui-filter-property-object',  FilterPropertyWidgetComponent);
    this.register('csui-library-select',  LibrarySelectionWidgetComponent);
    this.register('csui-chart-type-select',  ChartTypeSelectionWidgetComponent);
    this.register('csui-entity-select',  EntitySelectionWidgetComponent);
    this.register('csui-entity-field-select', EntityFieldSelectionWidgetComponent);
    this.register('csui-aggregate-select', AggregateSelectionWidgetComponent);
    this.register('csui-operator-select', OperatorSelectionWidgetComponent);
    this.register('csui-select', SelectionWidgetComponent);
    this.register('csui-filter-field', FilterFieldWidgetComponent);
    this.register('csui-array', ArrayWidgetComponent);
    this.register('csui-profile-picker', ProfilePickerComponent);
    this.register('csui-filter-field-array', FilterFieldArrayWidgetComponent);
    this.register('csui-tabular-menu', TabularMenuWidgetComponent);
    this.register('csui-head-menu', HeadMenuWidgetComponent);
  }
}