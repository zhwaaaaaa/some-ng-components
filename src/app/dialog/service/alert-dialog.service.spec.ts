import {inject, TestBed} from '@angular/core/testing';

import {AlertDialogService} from './alert-dialog.service';
import {DialogModule} from '../dialog.module';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    template: `
        <button (click)="alertDialog.showAlert('456')">Show</button>`
})
class TestRootComponent {
    constructor(public alertDialog: AlertDialogService) {
    }
}


describe('AlertDialogService', () => {
    beforeEach(() => {
        const testBed = TestBed.configureTestingModule({
            imports: [DialogModule],
            declarations: [TestRootComponent]
        }).compileComponents();
    });

    it('should be created', inject([AlertDialogService, DOCUMENT],
        (service: AlertDialogService, doc: Document) => {
            expect(service).toBeTruthy();
            service.showInfo('123');
            const message = doc.querySelector('.alert-message');
            // console.log(message);
            expect(message.innerHTML).toEqual('123');
        })
    );
});
