import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageUser } from './chat-message-user';

describe('ChatMessageUser', () => {
  let component: ChatMessageUser;
  let fixture: ComponentFixture<ChatMessageUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageUser],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
