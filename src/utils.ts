import { writeFileSync, existsSync, readFileSync } from 'fs';

interface MessageLog {
  timestamp: string;
  channel: string;
  userId: string;
  message: string;
}


export function isSolanaAddress(text: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(text);
}

export function saveMessageLog(message: MessageLog): void {
  const logFile = 'message_logs.json';
  let logs: MessageLog[] = [];
  
  if (existsSync(logFile)) {
      logs = JSON.parse(readFileSync(logFile, 'utf8'));
  }
  
  logs.push(message);
  writeFileSync(logFile, JSON.stringify(logs, null, 2));
}