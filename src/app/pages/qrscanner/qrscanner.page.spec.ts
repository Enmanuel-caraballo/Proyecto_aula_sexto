import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRscannerPage } from './qrscanner.page';

describe('QRscannerPage', () => {
  let component: QRscannerPage;
  let fixture: ComponentFixture<QRscannerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QRscannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
