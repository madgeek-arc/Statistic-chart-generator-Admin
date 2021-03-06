import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioWidgetComponent } from './radio-widget.component';

describe('RadioWidgetComponent', () => {
  let component: RadioWidgetComponent;
  let fixture: ComponentFixture<RadioWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
