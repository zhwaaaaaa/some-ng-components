import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldingPanelComponent } from './folding-panel.component';

describe('FoldingPanelComponent', () => {
  let component: FoldingPanelComponent;
  let fixture: ComponentFixture<FoldingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
