import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import { AssistantService } from 'src/app/services/assistant.service';
import { ChatMessage, ChatRequest, ChatResponse } from 'src/app/models/chat';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer?: ElementRef<HTMLDivElement>;

  prompt = '';
  loading = false;
  chatError = '';

  readonly quickSuggestions: string[] = [
    'Show me the current high-risk equipment summary',
    'What incidents need immediate attention?',
    'Give me a short finance KPI overview'
  ];

  messages: ChatMessage[] = [
    {
      id: 1,
      sender: 'assistant',
      text: 'Welcome to ANAPCO Assistant. Ask me about operations, incidents, risk, maintenance, weather, or finance insights.',
      timestamp: new Date(),
      response: {
        intent: 'WELCOME',
        confidence: 1,
        naturalLanguageAnswer: 'Welcome to ANAPCO Assistant. Ask me about operations, incidents, risk, maintenance, weather, or finance insights.',
        suggestions: [
          'What should I prioritize today?',
          'Summarize operational risks this week',
          'Show maintenance-critical assets'
        ]
      }
    }
  ];

  private shouldScrollToBottom = false;

  constructor(private assistantService: AssistantService) {}

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(text?: string): void {
    const question = (text ?? this.prompt).trim();
    if (!question || this.loading) {
      return;
    }

    this.chatError = '';
    this.addUserMessage(question);
    this.prompt = '';
    this.loading = true;

    const payload: ChatRequest = { question };

    this.assistantService.ask(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => this.addAssistantMessage(response),
        error: () => this.addErrorMessage('The assistant is currently unavailable. Please try again in a moment.')
      });
  }

  askSuggestion(suggestion: string): void {
    this.sendMessage(suggestion);
  }

  formatDataSummary(data: unknown): string[] {
    if (!data || typeof data !== 'object') {
      return [];
    }

    if (Array.isArray(data)) {
      return [`${data.length} item(s) returned.`];
    }

    return Object.entries(data as Record<string, unknown>)
      .slice(0, 5)
      .map(([key, value]) => `${this.toLabel(key)}: ${this.stringifyValue(value)}`);
  }

  trackByMessageId(_index: number, message: ChatMessage): number {
    return message.id;
  }

  private addUserMessage(text: string): void {
    this.messages.push({
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date()
    });
    this.shouldScrollToBottom = true;
  }

  private addAssistantMessage(response: ChatResponse): void {
    this.messages.push({
      id: Date.now() + 1,
      sender: 'assistant',
      text: response.naturalLanguageAnswer,
      timestamp: new Date(),
      response
    });
    this.shouldScrollToBottom = true;
  }

  private addErrorMessage(message: string): void {
    this.chatError = message;
    this.messages.push({
      id: Date.now() + 2,
      sender: 'assistant',
      text: message,
      timestamp: new Date(),
      isError: true
    });
    this.shouldScrollToBottom = true;
  }

  private scrollToBottom(): void {
    const element = this.messagesContainer?.nativeElement;
    if (!element) {
      return;
    }

    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }

  private toLabel(value: string): string {
    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/^./, char => char.toUpperCase());
  }

  private stringifyValue(value: unknown): string {
    if (value == null) {
      return '-';
    }
    if (Array.isArray(value)) {
      return `${value.length} item(s)`;
    }
    if (typeof value === 'object') {
      return 'Object';
    }
    return String(value);
  }
}
