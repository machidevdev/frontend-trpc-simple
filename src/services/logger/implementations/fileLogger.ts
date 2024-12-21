import { MessageLogger, MessageData } from '../types';
import { writeFileSync, readFileSync, existsSync } from 'fs';

export class JsonFileLogger implements MessageLogger {
    private logFile: string;

    constructor(logFile: string = 'message_logs.json') {
        this.logFile = logFile;
    }

    log(message: MessageData): void {
        let logs: MessageData[] = [];
        
        if (existsSync(this.logFile)) {
            logs = JSON.parse(readFileSync(this.logFile, 'utf8'));
        }
        
        logs.push(message);
        writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
    }
} 