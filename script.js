const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const welcome = document.getElementById("welcome");

const historyPanel = document.getElementById("historyPanel");
const historyOverlay = document.getElementById("historyOverlay");
const historyList = document.getElementById("historyList");

let currentChat = [];
let savedChats = JSON.parse(localStorage.getItem("novaHistory")) || [];

// IMPORTANT:
// Replace this with your Render backend URL.
const BACKEND_URL = "https://YOUR-SERVICE.onrender.com";


// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  if (welcome) {
    welcome.remove();
  }

  addMessage(text, "user");

  currentChat.push({
    role: "user",
    text: text
  });

  messageInput.value = "";
  autoResize(messageInput);

  const typing = addMessage("Thinking...", "ai");

  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    typing.remove();

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    add
