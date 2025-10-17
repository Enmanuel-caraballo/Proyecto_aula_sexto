import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartChatPage } from './smart-chat.page';

describe('SmartChatPage', () => {
  let component: SmartChatPage;
  let fixture: ComponentFixture<SmartChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
