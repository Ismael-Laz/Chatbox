// No installation instructions needed in the code itself

const express = require('express');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
    };

      const chat = model.startChat({
        generationConfig,
        history: [
            {
              role: "user",
              parts: [
                {text: "Hello"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Hello there, soccer enthusiast! 👋  What can I help you with today?  Are you looking for scores, news, player info, or just want to chat about the beautiful game? 😊 \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "What can you tell me about Cristiano Ronaldo"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Ah, Cristiano Ronaldo!  One of the greatest footballers of all time. \n\nHere's a quick rundown:\n\n* **Full Name:** Cristiano Ronaldo dos Santos Aveiro\n* **Born:** February 5, 1985, in Funchal, Madeira, Portugal\n* **Position:** Forward\n* **Current Club:** Al-Nassr (Saudi Pro League)\n\n**Key Achievements:**\n\n* **5 Ballon d'Or Awards:**  A record-breaking feat!\n* **5 UEFA Champions League Titles:**  He's a champion at the highest level.\n* **7 League Titles:**  Dominated in England, Spain, and Italy.\n* **Over 800 career goals:**  A prolific scorer throughout his career.\n\n**Style of Play:**\n\n* **Lightning Pace:** Known for his blistering speed and powerful dribbling.\n* **Clinical Finishing:** A lethal finisher with both feet and his head.\n* **Aerial Prowess:**  He's an excellent header of the ball, often scoring spectacular goals.\n\n**Legacy:**\n\nRonaldo's impact on the game is undeniable.  He's not just a player; he's a global icon, inspiring millions worldwide.  \n\nDo you want to know more about a specific aspect of his career or perhaps see some of his highlights?  Let me know, and I'll be happy to provide more details!  \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "What can you tell me about Manchester United"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Manchester United, a name synonymous with footballing history and glory! 🏆 Here's a glimpse into the Red Devils:\n\n**Key Facts:**\n\n* **Founded:** 1878, originally known as Newton Heath LYR Football Club.\n* **Stadium:** Old Trafford, with a capacity of 74,140, known as \"The Theatre of Dreams.\"\n* **Nickname:** The Red Devils, stemming from the red shirts worn by the team.\n* **Manager:** Erik ten Hag, a Dutch manager known for his attacking style of play.\n* **Current League Position:**  (Check live standings).\n\n**History:**\n\n* **Dominance in the 20th Century:**  Won numerous league titles, FA Cups, and European Cups, establishing themselves as a powerhouse.\n* **Sir Alex Ferguson Era:**  The legendary manager led the club to unprecedented success, winning multiple Premier League titles and the Champions League.\n* **Recent Years:**  Struggled for consistency after Ferguson's retirement but are now under new management and showing signs of revival.\n\n**Notable Players:**\n\n* **George Best:**  One of the greatest players of all time, known for his dribbling skills and flair.\n* **Sir Bobby Charlton:**  A legendary midfielder, a World Cup winner, and a club icon.\n* **Eric Cantona:**  A charismatic striker who helped revive the club's fortunes in the 1990s.\n* **David Beckham:**  A stylish midfielder known for his free-kicks and crosses.\n* **Cristiano Ronaldo:**  Played two spells with the club, winning trophies and scoring goals.\n\n**Fanbase:**\n\nUnited boast one of the largest and most passionate fanbases in the world, with supporters all over the globe. \n\n**Do you want to know more about a specific era, player, or maybe even delve into the club's rivalry with Liverpool?  I'm ready for your next question!** 😊 \n"},
              ],
            },
          ],
        });
        const result = await chat.sendMessage(userInput);
        const response = result.response;
        return response.text();
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/loader.gif', (req, res) => {
    res.sendFile(__dirname + '/loader.gif');
  });
  app.post('/chat', async (req, res) => {
    try {
      const userInput = req.body?.userInput;
      console.log('incoming /chat req', userInput)
      if (!userInput) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      const response = await runChat(userInput);
      res.json({ response });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await run(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});*/