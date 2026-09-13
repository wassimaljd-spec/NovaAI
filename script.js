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


  // HI / HELLO / HALLO

  if (
    lowerText === "hi" ||
    lowerText === "hello" ||
    lowerText === "hallo"
  ) {

    const reply =
      "Hey ✨ what we gonna do today";

    addMessage(reply, "ai");

    currentChat.push({
      text: reply,
      type: "ai"
    });

    saveCurrentChat();

    return;
  }


  // EXPLAIN SOMETHING

  if (
    lowerText === "explain something to me"
  ) {

    const reply =
      "Of course ✨ Tell me what you want me to explain!";

    addMessage(reply, "ai");

    currentChat.push({
      text: reply,
      type: "ai"
    });

    saveCurrentChat();

    return;
  }


  // HELP ME WRITE

  if (
    lowerText === "help me write something"
  ) {

    const reply =
      "Of course ✨ What do you want me to help you write?";

    addMessage(reply, "ai");

    currentChat.push({
      text: reply,
      type: "ai"
    });

    saveCurrentChat();

    return;
  }


  // GIVE ME AN IDEA

  if (
    lowerText === "give me an idea"
  ) {

    const reply =
      "Absolutely ✨ What kind of idea are you looking for?";

    addMessage(reply, "ai");

    currentChat.push({
      text: reply,
      type: "ai"
    });

    saveCurrentChat();

    return;
  }


  // TELL ME A JOKE

  if (
    lowerText === "tell me a joke"
  ) {

    const reply =
      "Sure ✨ Why did the computer go to the doctor? 😂\n\nBecause it had a virus! 💻";

    addMessage(reply, "ai");

    currentChat.push({
      text: reply,
      type: "ai"
    });

    saveCurrentChat();

    return;
  }


  // REAL AI API

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
// SAVE CHAT
// =========================

function saveCurrentChat() {

  if (currentChat.length === 0) return;

  const firstUserMessage = currentChat.find(
    message => message.type === "user"
  );

  if (!firstUserMessage) return;

  const chatData = {
    id: currentChatId || Date.now(),
    title: firstUserMessage.text,
    messages: currentChat
  };

  currentChatId = chatData.id;

  const existingIndex = savedChats.findIndex(
    savedChat => savedChat.id === currentChatId
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
// HISTORY OPEN / CLOSE
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


// =========================
// RENDER HISTORY
// =========================

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
// OPEN OLD CHAT
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
