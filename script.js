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


  const welcome =
    document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }


  addMessage(text, "user");


  currentChat.push({
    text: text,
    type: "user"
