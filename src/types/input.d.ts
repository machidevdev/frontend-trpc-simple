//here because input has no type definitions
declare module 'input' {
    const input: {
        text: (prompt: string) => Promise<string>
    }
    export = input;
} 