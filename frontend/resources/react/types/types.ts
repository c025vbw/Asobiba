export interface DocumentMetadata {
  id: string;
  producer: string;
  creator: string;
  creation_date: Date;
  page: number;
}

export interface Document {
  content: string;
  metadata: DocumentMetadata;
}

export interface ChatResponse {
  user_id: string;
  session_id: string;
  documents: Document[];
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  documents?: Document[];
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}
