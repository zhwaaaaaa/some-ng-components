import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StepTabComponent} from './step-tab.component';

describe('StepTabComponent', () => {
    let component: StepTabComponent;
    let fixture: ComponentFixture<StepTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StepTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StepTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
