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
  message.textContent = text;

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
  // MATH HELP CONVERSATION
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
    localReply("🧮 " + calculation);
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
  // GENERAL QUESTIONS
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
    lower === "i need help with math"
  ) {
    localReply(
      "Sure! 🧮 What can I help you with?"
    );
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
