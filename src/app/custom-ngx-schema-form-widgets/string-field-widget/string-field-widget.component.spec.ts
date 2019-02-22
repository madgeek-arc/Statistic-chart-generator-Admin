import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringFieldWidgetComponent } from './string-field-widget.component';

describe('StringFieldWidgetComponent', () => {
  let component: StringFieldWidgetComponent;
  let fixture: ComponentFixture<StringFieldWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringFieldWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFieldWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
