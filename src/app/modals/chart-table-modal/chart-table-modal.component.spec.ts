import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartTableModalComponent } from './chart-table-modal.component';

describe('ChartTableModalComponent', () => {
  let component: ChartTableModalComponent;
  let fixture: ComponentFixture<ChartTableModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
