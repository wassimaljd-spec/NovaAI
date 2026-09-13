const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");

let currentChat = [];
let savedChats = JSON.parse(localStorage.getItem("novaHistory")) || [];
let currentChatId = null;


// =========================
// ADD MESSAGE
// =========================
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

  currentChat.push({
    text: text,
    type: type
  });

  saveCurrentChat();
}


// =========================
// SEND MESSAGE
// =========================
function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }

  addMessage(text, "user");

  messageInput.value = "";
  autoResize(messageInput);

  const lower = text.toLowerCase().trim();


  // =========================
  // MATH HELP
  // =========================
  if (
    lower.includes("help me with math") ||
    lower.includes("help me with maths") ||
    lower.includes("can you help me with math") ||
    lower.includes("can you help me with maths") ||
    lower === "math help" ||
    lower === "maths help"
  ) {
    localReply("Sure! 🧮 What can I help you with?");
    return;
  }


  // =========================
  // CALCULATOR
  // =========================
  const calculation = calculateMath(text);

  if (calculation !== null) {
    localReply(calculation + " ✅");
    return;
  }


  // =========================
  // GREETINGS
  // =========================
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower === "hallo"
  ) {
    localReply("Hey ✨ What we gonna do today?");
    return;
  }


  // =========================
  // GENERAL
  // =========================
  if (
    lower === "what is ai" ||
    lower === "what is artificial intelligence"
  ) {
    localReply(
      "AI stands for Artificial Intelligence 🤖. It allows computers to understand information, learn from data and perform tasks that normally need human intelligence."
    );
    return;
  }

  if (
    lower === "what is the internet" ||
    lower === "what is internet"
  ) {
    localReply(
      "The internet is a huge network that connects computers and devices around the world 🌍."
    );
    return;
  }

  if (
    lower === "what is a computer" ||
    lower === "what is computer"
  ) {
    localReply(
      "A computer is an electronic device that processes information and follows instructions to perform tasks 💻."
    );
    return;
  }

  if (
    lower === "how does ai work" ||
    lower === "how does artificial intelligence work"
  ) {
    localReply(
      "AI learns patterns from lots of information and uses those patterns to produce answers, predictions or decisions 🤖."
    );
    return;
  }


  // =========================
  // SCHOOL
  // =========================
  if (
    lower === "help me with homework" ||
    lower === "i need help with homework" ||
    lower === "homework help"
  ) {
    localReply(
      "Of course 📚 Send me the homework question and I'll help you step by step."
    );
    return;
  }

  if (
    lower === "help me with math" ||
    lower === "help me with maths" ||
    lower === "i need help with math" ||
    lower === "i need help with maths"
  ) {
    localReply("Sure! 🧮 What can I help you with?");
    return;
  }

  if (lower === "what is photosynthesis") {
    localReply(
      "Photosynthesis 🌱 is the process plants use to turn sunlight, water and carbon dioxide into food and oxygen."
    );
    return;
  }

  if (lower === "what is gravity") {
    localReply(
      "Gravity is the force that pulls objects toward each other. Earth's gravity is what keeps us on the ground 🌍."
    );
    return;
  }


  // =========================
  // CREATIVE
  // =========================
  if (
    lower === "give me a story idea" ||
    lower === "give me a story"
  ) {
    localReply(
      "📖 Story idea: A teenager discovers an old phone that receives messages from someone living 20 years in the future."
    );
    return;
  }

  if (
    lower === "give me a name" ||
    lower === "give me a cool name"
  ) {
    localReply(
      "🔥 How about: NovaX, Shadow, Vortex, Blaze or Zenith?"
    );
    return;
  }

  if (
    lower === "write a short story" ||
    lower === "make a short story"
  ) {
    localReply(
      "🌙 Every night at exactly midnight, the stars disappeared for one minute. One night, a kid looked up and realized they weren't disappearing — they were moving closer."
    );
    return;
  }

  if (
    lower === "make me a character" ||
    lower === "create a character"
  ) {
    localReply(
      "⚡ Character idea: Kai, a 16-year-old inventor who can turn anything he draws into a real object for exactly 10 minutes."
    );
    return;
  }

  if (
    lower === "give me a game idea" ||
    lower === "game idea"
  ) {
    localReply(
      "🎮 Game idea: You wake up inside a city where time stops whenever you stop moving."
    );
    return;
  }

  if (
    lower === "make a poem" ||
    lower === "write a poem"
  ) {
    localReply(
      "✨ Stars above,\nDreams below,\nTake one step,\nAnd watch yourself grow."
    );
    return;
  }


  // =========================
  // SUGGESTIONS
  // =========================
  if (lower === "explain something to me") {
    localReply("Sure 💡 Tell me what you want me to explain.");
    return;
  }

  if (lower === "help me write something") {
    localReply("Absolutely ✍️ Tell me what you're writing and I'll help.");
    return;
  }

  if (lower === "give me an idea") {
    localReply(
      "Here's an idea 🚀: Make a game where every decision changes the world around the player."
    );
    return;
  }

  if (lower === "tell me a joke") {
    localReply(
      "Why did the computer go to the doctor? 😂 Because it had a virus!"
    );
    return;
  }


  // =========================
  // COMMON
  // =========================
  if (lower === "how are you") {
    localReply("I'm doing great 😎 Ready to help!");
    return;
  }

  if (lower === "what can you do") {
    localReply(
      "I can answer questions, help with homework, calculate math 🧮, help you write, create ideas and more!"
    );
    return;
  }

  if (
    lower === "thank you" ||
    lower === "thanks"
  ) {
    localReply("You're welcome bro 😎");
    return;
  }

  if (
    lower === "bye" ||
    lower === "goodbye"
  ) {
    localReply("See you later 👋");
    return;
  }

  if (
    lower === "who are you" ||
    lower === "what is your name"
  ) {
    localReply("I'm Nova AI ✦ Your AI assistant.");
    return;
  }


  // =========================
  // REAL AI BACKEND
  // =========================
  fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: text
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Server error");
      }

      return response.json();
    })
    .then(data => {
      localReply(data.reply || "I didn't get a response 😭");
    })
    .catch(error => {
      console.error(error);

      localReply(
        "Sorry 😭 Something went wrong. Check your server."
      );
    });
}


// =========================
// CALCULATOR
// =========================
function calculateMath(text) {
  let expression = text
    .toLowerCase()
    .replace(/what is/g, "")
    .replace(/calculate this/g, "")
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
    .replace(/\bmultiplied by\b/g, "*")
    .replace(/\bdivided by\b/g, "/");

  if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
    return null;
  }

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

    const displayExpression = expression
      .replace(/\*/g, " × ")
      .replace(/\//g, " ÷ ");

    return displayExpression + " = " + answer;
  } catch {
    return null;
  }
}


// =========================
// LOCAL REPLY
// =========================
function localReply(reply) {
  setTimeout(() => {
    addMessage(reply, "ai");
  }, 300);
}


// =========================
// SAVE CHAT
// =========================
function saveCurrentChat() {
  if (currentChat.length === 0) return;

  const firstUserMessage = currentChat.find(
    message => message.type === "user"
  );

  const title = firstUserMessage
    ? firstUserMessage.text.substring(0, 30)
    : "New chat";

  if (!currentChatId) {
    currentChatId = Date.now().toString();
  }

  const existingIndex = savedChats.findIndex(
    savedChat => savedChat.id === currentChatId
  );

  const chatData = {
    id: currentChatId,
    title: title,
    messages: currentChat
  };

  if (existingIndex >= 0) {
    savedChats[existingIndex] = chatData;
  } else {
    savedChats.unshift(chatData);
  }

  localStorage.setItem(
    "novaHistory",
    JSON.stringify(savedChats)
  );

  renderHistory();
}


// =========================
// HISTORY
// =========================
function toggleHistory() {
  const panel = document.getElementById("historyPanel");
  const overlay = document.getElementById("historyOverlay");

  panel.classList.toggle("open");
  overlay.classList.toggle("show");

  renderHistory();
}


function renderHistory() {
  const list = document.getElementById("historyList");

  if (!list) return;

  list.innerHTML = "";

  if (savedChats.length === 0) {
    list.innerHTML = "<p>No chats yet.</p>";
    return;
  }

  savedChats.forEach(savedChat => {
    const item = document.createElement("div");
    item.className = "history-item";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = savedChat.title;
    button.onclick = () => openChat(savedChat.id);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "🗑️";

    deleteButton.onclick = event => {
      deleteChat(event, savedChat.id);
    };

    item.appendChild(button);
    item.appendChild(deleteButton);

    list.appendChild(item);
  });
}


function openChat(id) {
  const selectedChat = savedChats.find(
    savedChat => savedChat.id === id
  );

  if (!selectedChat) return;

  currentChat = [];
  currentChatId = selectedChat.id;

  chat.innerHTML = "";

  selectedChat.messages.forEach(message => {
    addMessage(message.text, message.type);
  });

  const panel = document.getElementById("historyPanel");
  const overlay = document.getElementById("historyOverlay");

  panel.classList.remove("open");
  overlay.classList.remove("show");
}


function deleteChat(event, id) {
  event.stopPropagation();

  savedChats = savedChats.filter(
    savedChat => savedChat.id !== id
  );

  localStorage.setItem(
    "novaHistory",
    JSON.stringify(savedChats)
  );

  renderHistory();
}


// =========================
// SUGGESTIONS
// =========================
function suggest(text) {
  messageInput.value = text;
  sendMessage();
}


// =========================
// ENTER TO SEND
// =========================
function handleKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}


// =========================
// AUTO RESIZE
// =========================
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}


// =========================
// NEW CHAT
// =========================
function newChat() {
  saveCurrentChat();

  currentChat = [];
  currentChatId = null;

  chat.innerHTML = `
    <section class="welcome" id="welcome">
      <div class="welcome-icon">🚀</div>

      <h2>What can I help you with?</h2>

      <p>
        Ask me anything. I'm here to help you learn,
        create and explore.
      </p>

      <div class="suggestions">
        <button type="button" onclick="suggest('Explain something to me')">
          💡 Explain something
        </button>

        <button type="button" onclick="suggest('Help me write something')">
          ✍️ Help me write
        </button>

        <button type="button" onclick="suggest('Give me an idea')">
          🚀 Give me an idea
        </button>
      </div>
    </section>
  `;

  messageInput.value = "";
  autoResize(messageInput);
}


// =========================
// ESCAPE TEXT
// =========================
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


// =========================
// START
// =========================
renderHistory();
