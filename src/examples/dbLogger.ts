import { MessageLogger, MessageData } from '../logger';

export class DatabaseLogger implements MessageLogger {
    private db: any; // Replace with your database client

    constructor(dbClient: any) {
        this.db = dbClient;
    }

    async log(message: MessageData): Promise<void> {
        await this.db.messages.create({
            data: message
        });
    }
} 