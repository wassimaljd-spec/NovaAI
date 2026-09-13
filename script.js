const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");


// ==============================
// NOVA'S BUILT-IN RESPONSES
// ==============================

const replies = {

  "hi": "Yooo 😎 What's good?",
  "hello": "Yo! 👋 What's good?",
  "hey": "Ayy 😎 What's up?",
  "yo": "Yooo bro 💀",

  "how are you": "I'm doing great 🤖🔥 How about you?",
  "you good": "Always 😎",
  "what's up": "Not much 😎 Just chilling in the code.",
  "what are you": "I'm Nova AI ✦ Your AI assistant.",
  "who are you": "I'm Nova AI ✦ Your slightly chaotic AI assistant 😎",
  "are you ai": "Yep 🤖 I'm an AI!",
  "can you code": "Absolutely 😎 Send me the code and let's cook 🔥",

  "thank you": "Anytime bro ❤️",
  "thanks": "No problem 😎",
  "bye": "Aight, later bro 👋",
  "goodbye": "Later bro 🚀",

  "lol": "You laughing at me or with me? 😂",
  "lmao": "NAHHH 😭",
  "haha": "Glad I made you laugh 😂",
  "bruh": "Bro what 💀",
  "fuck you": "Fuck you too 😂",
  "you suck": "Damn bro, I just got here 💀",
  "stupid": "Look who's talking 💀",
  "idiot": "Takes one to know one 😭",
  "shut up": "Make me 😂",

  "i'm bored": "Say less. Let's build something 🔥",
  "i am bored": "Say less. Let's build something 🔥",
  "i'm tired": "Take a break bro 😭 You deserve it.",
  "i'm hungry": "Go get some food bro 😭🍕",
  "i'm happy": "AYYY 🔥 Love that for you 😎",
  "i'm sad": "I'm here bro ❤️ What's going on?",
  "i'm confused": "No worries 😎 We'll figure it out together.",

  "can you help me": "Of course! 😎 What do you need help with?",
  "help me": "Say less 😎 What's the problem?",
  "help me code": "Let's cook some code 👨‍💻🔥 What are you building?",
  "help me make a website": "Bet 🌐🔥 Let's build it!",
  "help me make an app": "Say less 📱😎 What kind of app?",
  "help me make a game": "LET'S GOOO 🎮🔥 What game are we making?",

  "can you do math": "Yep 🧮 Give me the numbers!",
  "can you do maths": "Yep 🧮 Send me the problem!",
  "i need math": "I'm ready 🧮 What are we solving?",
  "i need maths": "I'm ready 🧮 What are we solving?",

  "tell me a joke":
    "Why do programmers prefer dark mode? Because light attracts bugs 🐛💀",

  "tell me another joke":
    "I would tell you a UDP joke... but you might not get it 😂",

  "give me an idea":
    "Make a game where the player has to escape an AI-controlled city 🤖🌆🔥",

  "surprise me":
    "Fun fact: Octopuses have three hearts 🐙❤️❤️❤️",

  "what can you do":
    "I can help with maths, coding, school, writing, ideas and more 🚀",

  "good morning":
    "Good morninggg ☀️😎",

  "good night":
    "Night bro 🌙 Sleep well!",

  "nice":
    "Yessir 🔥",

  "cool":
    "😎🔥",

  "wow":
    "I know right? 😂",

  "yes":
    "YESSIRRR 🔥",

  "no":
    "Damn 😭",

  "ok":
    "Bet 😎",

  "okay":
    "Aight 😎"
};


// ==============================
// SEND MESSAGE
// ==============================

function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) return;

  // Remove welcome screen
  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }

  // Show user's message
  addMessage(text, "user");

  // Clear input
  messageInput.value = "";
  autoResize(messageInput);

  // Wait a little before Nova replies
  setTimeout(() => {

    const response = getNovaResponse(text);

    addMessage(response, "ai");

  }, 500);
}


// ==============================
// GET NOVA RESPONSE
// ==============================

function getNovaResponse(text) {

  const lower = text.toLowerCase().trim();

  // Exact built-in response
  if (replies[lower]) {
    return replies[lower];
  }


  // Maths help
  if (
    lower.includes("help me with math") ||
    lower.includes("help me with maths") ||
    lower.includes("can you help me with math") ||
    lower.includes("can you help me with maths")
  ) {
    return "Sure! 🧮 What can I help you with?";
  }


  // Calculator
  const mathAnswer = calculateMath(text);

  if (mathAnswer !== null) {
    return mathAnswer + " ✅";
  }


  // More flexible responses
  if (lower.includes("joke")) {
    return "Why was the computer cold? It left its Windows open 😂💀";
  }

  if (lower.includes("math") || lower.includes("maths")) {
    return "Sure 🧮 Send me the maths problem!";
  }

  if (lower.includes("game")) {
    return "🎮 I'm down! We could make a racing game, survival game, platformer or even an AI game.";
  }

  if (lower.includes("website")) {
    return "🌐 Let's build it! Tell me what you want the website to do.";
  }

  if (lower.includes("app")) {
    return "📱 Bet! Tell me what kind of app you want to make.";
  }

  if (lower.includes("hello") || lower.includes("hey")) {
    return "Ayy 😎 What's up?";
  }


  // Default response
  return "Hmm 👀 I don't have a built-in answer for that yet, but I'm listening. Try asking me something else!";
}


// ==============================
// CALCULATOR
// ==============================

function calculateMath(text) {

  let expression = text
    .toLowerCase()
    .replace(/what is/g, "")
    .replace(/calculate/g, "")
    .replace(/please/g, "")
    .trim();


  expression = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/\^/g, "**")
    .replace(/\bx\b/g, "*")
    .replace(/\bplus\b/g, "+")
    .replace(/\bminus\b/g, "-")
    .replace(/\btimes\b/g, "*")
    .replace(/multiplied by/g, "*")
    .replace(/divided by/g, "/");


  // Only allow maths characters
  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return null;
  }


  // Must contain a number and an operator
  if (
    !/\d/.test(expression) ||
    !/[+\-*/%]/.test(expression)
  ) {
    return null;
  }


  try {

    const answer = Function(
      '"use strict"; return (' + expression + ')'
    )();


    if (
      typeof answer !== "number" ||
      !Number.isFinite(answer)
    ) {
      return null;
    }


    return expression
      .replace(/\*/g, " × ")
      .replace(/\//g, " ÷ ")
      + " = " + answer;

  } catch {

    return null;
  }
}


// ==============================
// ADD MESSAGE
// ==============================

function addMessage(text, type) {

  const message = document.createElement("div");

  message.className = "message " + type;


  if (type === "ai") {

    message.innerHTML = `
      <div class="nova-name">✦ Nova</div>
      <div class="nova-text">${escapeHTML(text)}</div>
    `;

  } else {

    message.textContent = text;

  }


  chat.appendChild(message);

  chat.scrollTop = chat.scrollHeight;
}


// ==============================
// SUGGESTION BUTTONS
// ==============================

function suggest(text) {

  messageInput.value = text;

  sendMessage();
}


// ==============================
// ENTER TO SEND
// ==============================

function handleKey(event) {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();
  }
}


// ==============================
// TEXTAREA RESIZE
// ==============================

function autoResize(textarea) {

  textarea.style.height = "auto";

  textarea.style.height =
    Math.min(textarea.scrollHeight, 160) + "px";
}


// ==============================
// NEW CHAT
// ==============================

function newChat() {

  chat.innerHTML = `
    <section class="welcome" id="welcome">

      <div class="welcome-icon">🚀</div>

      <h2>What can I help you with?</h2>

      <p>
        Ask me anything. I'm here to help you
        learn, create and explore.
      </p>

      <div class="suggestions">

        <button type="button"
          onclick="suggest('Explain something to me')">
          💡 Explain something
        </button>

        <button type="button"
          onclick="suggest('Help me write something')">
          ✍️ Help me write
        </button>

        <button type="button"
          onclick="suggest('Give me an idea')">
          🚀 Give me an idea
        </button>

      </div>

    </section>
  `;

  messageInput.value = "";

  autoResize(messageInput);
}


// ==============================
// HISTORY BUTTON
// ==============================

function toggleHistory() {

  const panel = document.getElementById("historyPanel");
  const overlay = document.getElementById("historyOverlay");

  if (!panel || !overlay) return;

  panel.classList.toggle("open");
  overlay.classList.toggle("open");
}


// ==============================
// SECURITY
// ==============================

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


// Make functions available to HTML
window.sendMessage = sendMessage;
window.suggest = suggest;
window.handleKey = handleKey;
window.autoResize = autoResize;
window.newChat = newChat;
window.toggleHistory = toggleHistory;
