# Telegram Message Monitor

A Node.js application that monitors specific Telegram group chats and logs messages from targeted users.

## Features

- Monitor multiple Telegram group chats simultaneously
- Track messages from specific user IDs
- Log messages with timestamp, channel, user ID, and content
- Configurable logging system (JSON file, console output implement your own and plug it in)
- Solana address validation utility

## Prerequisites

- Node.js (18 or higher)
- Telegram API credentials (API_ID and API_HASH)
- Telegram account

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/telegram-message-monitor.git
   cd telegram-message-monitor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Telegram API credentials:
   ```
   API_ID=your_api_id
   API_HASH=your_api_hash
   ```

## Configuration

Edit the `config.ts` file to specify:

- Target group chat names
- User IDs to monitor
- Logging preferences
