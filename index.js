const { App } = require('@slack/bolt');
const axios = require("axios")
require('dotenv').config();

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	socketMode: true,
	appToken: process.env.SLACK_APP_TOKEN,
});

app.command('/hello', async ({ command, ack, say }) => {
	await ack();

	await say(`Hello, <@${command.user_id}>`);
});



app.command('/shorturl', async ({ command, ack, say }) => {
    await ack();

    // Extract the URL from the command text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = command.text.match(urlRegex);
    if (!urls || urls.length === 0) {
        await say('No URL provided');
        return;
    }
    const longUrl = urls[0];

    try {
        // Call your URL shortening service
        const response = await axios.post('https://urlshorten-rzcr.onrender.com/shorten', { originalUrl: longUrl });

        // Extract the shortened URL from the response
        const shortUrl = response.data.shortUrl;

        await say(`Shortened URL: https://urlshorten-rzcr.onrender.com/${shortUrl}`);
    } catch (error) {
        console.error('Error shortening URL:', error);
        await say('Failed to shorten URL');
    }
});



(async () => {
	// Start your app
	await app.start(process.env.PORT || 8000);
	console.log(`⚡️ Bot app is running on port ${process.env.PORT || 8000}!`);
})();