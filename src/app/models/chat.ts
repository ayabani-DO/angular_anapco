export interface ChatRequest {
  question: string;
  context?: Record<string, unknown>;
}

export interface ChatResponse {
  intent: string;
  confidence: number;
  data?: unknown;
  naturalLanguageAnswer: string;
  suggestions?: string[];
}

export interface ChatMessage {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: Date;
  response?: ChatResponse;
  pending?: boolean;
  isError?: boolean;
}
