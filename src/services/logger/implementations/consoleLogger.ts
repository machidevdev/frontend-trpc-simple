import { MessageLogger, MessageData } from '../types';

export class ConsoleLogger implements MessageLogger {
    log(message: MessageData): void {
        console.log('[Message Log]', message);
    }
} 