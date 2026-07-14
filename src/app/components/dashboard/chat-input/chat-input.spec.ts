import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInput } from './chat-input';

describe('ChatInput', () => {
  let component: ChatInput;
  let fixture: ComponentFixture<ChatInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map permission errors to a helpful message', () => {
    const message = (component as any).formatSpeechError('not-allowed');

    expect(message).toContain('micrófono');
  });

  it('should map audio capture errors to a specific message', () => {
    const message = (component as any).formatSpeechError('audio-capture');

    expect(message).toContain('micrófono');
  });
});
