import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LibrarySelectionWidgetComponent } from './library-selection-widget.component';

describe('LibrarySelectionWidgetComponent', () => {
  let component: LibrarySelectionWidgetComponent;
  let fixture: ComponentFixture<LibrarySelectionWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarySelectionWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarySelectionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
