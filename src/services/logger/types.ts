export interface MessageData {
    timestamp: string;
    channel: string;
    userId: string;
    message: string;
}

export interface MessageLogger {
    log(message: MessageData): void;
} 