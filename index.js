const { App } = require('@slack/bolt');
const axios = require("axios")
require('dotenv').config();

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_BOT_TOKEN,
});

app.message('quote',async ({ message, say }) => {
    
  
      try {
          let resp=await axios.get(`https://api.quotable.io/random`)
          console.log(message)
          const quote=resp.data.content;
          await say(`hello, <@${message.user}>, ${quote}`)
      } catch (error) {
        console.error(error);
        await say('An error occurred while shortening the URL.');
      }
   
  });

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
  })();

