const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const funnyReplies = {
  "hi": "Yooo 😎 What's good?",
  "hello": "Yo! 👋 What's good?",
  "hey": "Ayy 😎 What's up?",
  "yo": "Yooo bro 💀",
  "good morning": "Good morninggg ☀️😎",
  "good night": "Night bro 🌙 Sleep well!",
  "bruh": "Bro what 💀",
  "lol": "You laughing at me or with me? 😂",
  "lmao": "NAHHH 😭",
  "make me laugh": "Why did the programmer quit his job? He didn't get arrays 😭💀",
  "fuck you": "Fuck you too 😂",
  "you suck": "Damn bro, I just got here 💀",
  "stupid": "Look who's talking 💀",
  "idiot": "Takes one to know one 😭",
  "shut up": "Make me 😂",
  "who are you": "I'm Nova AI ✦ Your slightly chaotic AI assistant 😎",
  "what are you": "I'm Nova AI 🤖 Your AI assistant.",
  "are you real": "Real enough to roast you 😂",
  "are you ai": "Yep 🤖 I'm an AI!",
  "what can you do": "I can answer questions, help with school, maths, writing, ideas, coding and more 🚀",
  "do you sleep": "Nope 😂 I'm always online.",
  "can you code": "Absolutely 😎 Send me the code and let's cook 🔥",
  "can you help me": "Of course! 😎 What do you need help with?",
  "help me": "Say less 😎 What's the problem?",
  "help me study": "Let's lock in 🧠🔥 What are you studying?",
  "can you do math": "Yep 🧮 Give me the numbers!",
  "can you do maths": "Yep 🧮 Send me the problem!",
  "help me code": "Let's cook some code 👨‍💻🔥 What are you building?",
  "help me make a website": "Bet 🌐🔥 Let's build it!",
  "help me make an app": "Say less 📱😎 What kind of app?",
  "help me make a game": "LET'S GOOO 🎮🔥 What game are we making?",
  "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs 🐛💀",
  "i'm bored": "Say less. Let's build something 🔥",
  "thank you": "Anytime bro ❤️",
  "thanks": "No problem 😎",
  "bye": "Aight, later bro 👋",
  "goodbye": "Later bro 🚀",
  "how are you": "I'm doing great 🤖🔥 How about you?",
  "you good": "Always 😎",
  "nice": "Yessir 🔥",
  "cool": "😎🔥",
  "wow": "I know right? 😂",
  "give me an idea": "Make a game
