import { config } from './config';
import { config as dotenvConfig } from 'dotenv';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';
import { NewMessageEvent } from 'telegram/events';
import { isSolanaAddress } from './utils';
import { MessageData, MessageLogger, JsonFileLogger } from './services/logger';

// Load environment variables
dotenvConfig();

// Validate environment variables
if (!process.env.API_ID || !process.env.API_HASH) {
    throw new Error('API_ID and API_HASH must be provided in environment variables');
}

const apiId: number = parseInt(process.env.API_ID);
const apiHash: string = process.env.API_HASH;
//string session will be empty at the beginning. once you login remember to save it in the .env file
const stringSession = new StringSession(process.env.SESSION_STRING || ''); 

// Initialize logger - choose your own implementation
const messageLogger: MessageLogger = new JsonFileLogger();

async function main(): Promise<void> {
    console.log('Loading interactive example...');
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });

    // Start the client
    await client.start({
        phoneNumber: async () => await input.text('Please enter your phone number: '),
        password: async () => await input.text('Please enter your password: '),
        phoneCode: async () => await input.text('Please enter the code you received: '),
        onError: (err: Error) => console.log(err),
    });

    console.log('You are now connected!');
    console.log('Session string:', client.session.save());

    // Listen for new messages in specific group chats
    client.addEventHandler(async (event: NewMessageEvent) => {
        const message = event.message;
        const peer = message?.peerId;
        if (!message || !peer || peer.className !== 'PeerChannel') return;

        try {
            const channelId = Number(peer.channelId);
            const chat = await client.getEntity(channelId);
            
            if ('title' in chat) {
                const chatTitle = chat.title;
                if (!config.groups.includes(chatTitle)) return;

                if (message.fromId?.className === 'PeerUser') {
                    const userId = message.fromId.userId.toString();
                    
                  

                    const messageText = message.message;
                
                    const timestamp = new Date(message.date * 1000).toLocaleString();
                    console.log(`[${timestamp}] Channel: ${chatTitle}`);
                    console.log(`User ID: ${userId}`);
                    console.log(`Message: ${messageText}`);
                    console.log('------------------------');

                    // Save to message log
                    try {
                        const logEntry: MessageData = {
                            timestamp: new Date(message.date * 1000).toISOString(),
                            channel: chatTitle,
                            userId: userId,
                            message: messageText
                        };
                        messageLogger.log(logEntry);
                    } catch (error) {
                        console.error('Failed to save message to log:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    // Keep the process running
    await new Promise(() => {});
}

main().catch((err: Error) => {
    console.error('An error occurred:', err);
    process.exit(1);
}); 