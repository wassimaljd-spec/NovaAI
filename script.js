const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");

let currentChat = [];
let savedChats = JSON.parse(
  localStorage.getItem("novaHistory")
) || [];

let currentChatId = null;


// =========================
// ADD MESSAGE
// =========================

function addMessage(text, type) {
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;

  return message;
}


// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

  const text = messageInput.value.trim();

  if (!text) return;

  const welcome = document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }

  addMessage(text, "user");

  currentChat.push({
    text: text,
    type: "user"
  });

  messageInput.value = "";
  autoResize(messageInput);

  const lowerText = text.toLowerCase().trim();


  // =========================
  // GREETINGS
  // =========================

  if (
    lowerText === "hi" ||
    lowerText === "hello" ||
    lowerText === "hey" ||
    lowerText === "hallo"
  ) {
    return localReply(
      "Hey ✨ what we gonna do today"
    );
  }


  // =========================
  // GENERAL QUESTIONS
  // =========================

  if (
    lowerText === "what is ai" ||
    lowerText === "what is artificial intelligence"
  ) {
    return localReply(
      "AI means Artificial Intelligence 🤖 It is technology that allows computers to learn, understand information, solve problems, and generate responses."
    );
  }


  if (
    lowerText === "what is the internet" ||
    lowerText === "what is internet"
  ) {
    return localReply(
      "The internet is a huge network that connects computers and devices around the world 🌐 It lets us communicate, visit websites, play games, stream videos, and much more."
    );
  }


  if (
    lowerText === "what is a computer" ||
    lowerText === "what is computer"
  ) {
    return localReply(
      "A computer is an electronic device that processes information 💻 It can run programs, store data, play games, browse the internet, and much more."
    );
  }


  if (
    lowerText === "how does ai work" ||
    lowerText === "how does artificial intelligence work"
  ) {
    return localReply(
      "AI learns patterns from lots of information 🧠 Then it uses those patterns to generate answers, recognize things, make predictions, or solve problems."
    );
  }


  // =========================
  // SCHOOL / HOMEWORK
  // =========================

  if (
    lowerText === "help me with homework" ||
    lowerText === "i need help with homework" ||
    lowerText === "homework help"
  ) {
    return localReply(
      "Of course 📚 Send me the homework question and I'll help you work through it step by step."
    );
  }


  if (
    lowerText === "help me with math" ||
    lowerText === "i need help with math"
  ) {
    return localReply(
      "Absolutely 📐 Send me the math problem and I'll explain how to solve it step by step."
    );
  }


  if (
    lowerText === "what is photosynthesis"
  ) {
    return localReply(
      "Photosynthesis 🌱 is how plants make their own food. They use sunlight, water, and carbon dioxide to produce glucose and oxygen."
    );
  }


  if (
    lowerText === "what is gravity"
  ) {
    return localReply(
      "Gravity 🌎 is a force that pulls objects toward each other. On Earth, it is what keeps us on the ground and makes objects fall."
    );
  }


  // =========================
  // EXISTING RESPONSES
  // =========================

  if (
    lowerText === "explain something to me"
  ) {
    return localReply(
      "Of course ✨ Tell me what you want me to explain!"
    );
  }


  if (
    lowerText === "help me write something"
  ) {
    return localReply(
      "Of course ✨ What do you want me to help you write?"
    );
  }


  if (
    lowerText === "give me an idea"
  ) {
    return localReply(
      "Absolutely ✨ What kind of idea are you looking for?"
    );
  }


  if (
    lowerText === "tell me a joke"
  ) {
    return localReply(
      "Sure ✨ Why did the computer go to the doctor? 😂\n\nBecause it had a virus! 💻"
    );
  }


  // =========================
  // CREATIVE STUFF
  // =========================

  if (
    lowerText === "give me a story idea" ||
    lowerText === "give me a story"
  ) {
    return localReply(
      "Here's one 🚀 A teenager discovers that their phone can receive messages from the future... but every message changes something in the present."
    );
  }


  if (
    lowerText === "give me a name" ||
    lowerText === "give me a cool name"
  ) {
    return localReply(
      "Try this one: **NovaX** ⚡ It sounds futuristic and works great for a game, app, or character."
    );
  }


  if (
    lowerText === "write a short story" ||
    lowerText === "make a short story"
  ) {
    return localReply(
      "Sure 📖\n\nA boy looked at the stars every night. One evening, a star suddenly fell into his backyard. When he touched it, his phone displayed one message:\n\n\"We found you.\" 👀"
    );
  }


  if (
    lowerText === "make me a character" ||
    lowerText === "create a character"
  ) {
    return localReply(
      "Character idea 🎮\n\nName: Kai\nAge: 16\nPower: Controls electricity ⚡\nPersonality: Funny, confident, but secretly nervous about his powers.\nGoal: Find out where his powers came from."
    );
  }


  if (
    lowerText === "give me a game idea" ||
    lowerText === "game idea"
  ) {
    return localReply(
      "Game idea 🎮🔥\n\nYou wake up in a city where time stops every midnight. You have 10 minutes to explore before everything freezes again."
    );
  }


  if (
    lowerText === "make a poem" ||
    lowerText === "write a poem"
  ) {
    return localReply(
      "Sure ✨\n\nThrough the night, the city glows,\nA million dreams, nobody knows.\nOne small spark begins to rise,\nChasing tomorrow through the skies. 🚀"
    );
  }


  // =========================
  // MORE COMMON QUESTIONS
  // =========================

  if (
    lowerText === "how are you"
  ) {
    return localReply(
      "I'm doing great 😎 What are we working on?"
    );
  }


  if (
    lowerText === "what can you do"
  ) {
    return localReply(
      "I can help with questions, homework, writing, ideas, coding, explanations, and creative stuff 🚀"
    );
  }


  if (
    lowerText === "thank you" ||
    lowerText === "thanks"
  ) {
    return localReply(
      "You're welcome! 🤝✨"
    );
  }


  if (
    lowerText === "bye" ||
    lowerText === "goodbye"
  ) {
    return localReply(
      "See you later! 👋🚀"
    );
  }


  if (
    lowerText === "who are you" ||
    lowerText === "what is your name"
  ) {
    return localReply(
      "I'm Nova AI 🚀 Your AI assistant."
    );
  }


  // =========================
  // REAL AI API
  // =========================

  const loading =
    addMessage("Thinking... ✨", "ai");

  try {

    const response = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: text
      })

    });

    const data = await response.json();

    loading.remove();

    if (!response.ok) {
      throw new Error(
        data.error || "Something went wrong"
      );
    }

    addMessage(data.reply, "ai");

    currentChat.push({
      text: data.reply,
      type: "ai"
    });

    saveCurrentChat();

  } catch (error) {

    loading.remove();

    const errorMessage =
      "Sorry 😭 Something went wrong. Check your server.";

    addMessage(errorMessage, "ai");

    currentChat.push({
      text: errorMessage,
      type: "ai"
    });

    saveCurrentChat();

    console.error(error);
  }
}


// =========================
// LOCAL RESPONSE
// =========================

function localReply(reply) {

  addMessage(reply, "ai");

  currentChat.push({
    text: reply,
    type: "ai"
  });

  saveCurrentChat();

  return;
}


// =========================
// SAVE CHAT
// =========================

function saveCurrentChat() {

  if (currentChat.length === 0) return;

  const firstUserMessage =
    currentChat.find(
      message => message.type === "user"
    );

  if (!firstUserMessage) return;

  const chatData = {
    id: currentChatId || Date.now(),
    title: firstUserMessage.text,
    messages: currentChat
  };

  currentChatId = chatData.id;

  const existingIndex =
    savedChats.findIndex(
      savedChat =>
        savedChat.id === currentChatId
    );

  if (existingIndex !== -1) {
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

  const panel =
    document.getElementById("historyPanel");

  const overlay =
    document.getElementById("historyOverlay");

  panel.classList.toggle("open");
  overlay.classList.toggle("open");

  renderHistory();
}


function renderHistory() {

  const list =
    document.getElementById("historyList");

  if (!list) return;

  list.innerHTML = "";

  if (savedChats.length === 0) {

    list.innerHTML = `
      <div class="empty-history">
        No chats yet 🥀
      </div>
    `;

    return;
  }

  savedChats.forEach(savedChat => {

    const item =
      document.createElement("div");

    item.className = "history-item";

    item.innerHTML = `
      <span class="history-title">
        ✦ ${escapeHTML(savedChat.title)}
      </span>

      <button
        class="delete-history"
        type="button"
        onclick="deleteChat(event, ${savedChat.id})"
      >
        🗑️
      </button>
    `;

    item.addEventListener(
      "click",
      function(event) {

        if (
          event.target.classList.contains(
            "delete-history"
          )
        ) {
          return;
        }

        openChat(savedChat.id);
      }
    );

    list.appendChild(item);

  });
}


// =========================
// OPEN CHAT
// =========================

function openChat(id) {

  const savedChat =
    savedChats.find(
      savedChat => savedChat.id === id
    );

  if (!savedChat) return;

  currentChat =
    [...savedChat.messages];

  currentChatId =
    savedChat.id;

  chat.innerHTML = "";

  savedChat.messages.forEach(message => {

    addMessage(
      message.text,
      message.type
    );

  });

  toggleHistory();
}


// =========================
// DELETE CHAT
// =========================

function deleteChat(event, id) {

  event.stopPropagation();

  savedChats =
    savedChats.filter(
      savedChat => savedChat.id !== id
    );

  localStorage.setItem(
    "novaHistory",
    JSON.stringify(savedChats)
  );

  if (currentChatId === id) {

    currentChatId = null;
    currentChat = [];

  }

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

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    sendMessage();

  }
}


// =========================
// AUTO RESIZE
// =========================

function autoResize(textarea) {

  textarea.style.height = "auto";

  textarea.style.height =
    Math.min(
      textarea.scrollHeight,
      140
    ) + "px";
}


// =========================
// NEW CHAT
// =========================

function newChat() {

  if (currentChat.length > 0) {
    saveCurrentChat();
  }

  currentChat = [];
  currentChatId = null;

  chat.innerHTML = `

    <section
      class="welcome"
      id="welcome"
    >

      <div class="welcome-icon">
        🚀
      </div>

      <h2>
        What can I help you with?
      </h2>

      <p>
        Ask me anything. I'm here to help you learn,
        create and explore.
      </p>

      <div class="suggestions">

        <button
          type="button"
          onclick="suggest('Explain something to me')"
        >
          💡 Explain something
        </button>

        <button
          type="button"
          onclick="suggest('Help me write something')"
        >
          ✍️ Help me write
        </button>

        <button
          type="button"
          onclick="suggest('Give me an idea')"
        >
          🚀 Give me an idea
        </button>

      </div>

    </section>

  `;
}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


// =========================
// LOAD HISTORY
// =========================

renderHistory();
