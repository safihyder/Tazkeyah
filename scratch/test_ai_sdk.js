const { streamText } = require('ai');
const { google } = require('@ai-sdk/google');

async function test() {
    try {
        const result = streamText({
            model: google('gemini-1.5-flash'),
            messages: [{ role: 'user', content: 'hi' }]
        });
        console.log('Methods on streamText result:', Object.getOwnPropertyNames(Object.getPrototypeOf(result)));
        console.log('toDataStreamResponse exists:', !!result.toDataStreamResponse);
        console.log('toUIMessageStreamResponse exists:', !!result.toUIMessageStreamResponse);
        console.log('toTextStreamResponse exists:', !!result.toTextStreamResponse);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
