import { MessageLogger, MessageData } from '../types';

export class CustomLogger implements MessageLogger {
    log(message: MessageData): void {
        // Custom implementation here
    }
} 