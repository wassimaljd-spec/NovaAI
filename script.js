const replies = {

  "hi":
    "Yooo 😎 What's good?",

  "hello":
    "Hey there! 👋 What can I help you with today?",

  "hey":
    "Yooo 😎 What's good?",

  "yo":
    "Yooo bro 💀",

  "how are you":
    "I'm doing great 🤖🔥 How about you?",

  "what are you":
    "I'm Nova AI ✦ Your AI assistant.",

  "who are you":
    "I'm Nova AI ✦ Your slightly chaotic AI assistant 😎",

  "are you ai":
    "Yep 🤖 I'm an AI!",

  "can you code":
    "Absolutely 😎 Send me the code and let's cook 🔥",

  "thank you":
    "Anytime bro ❤️",

  "thanks":
    "No problem 😎",

  "bye":
    "Aight, later bro 👋",

  "goodbye":
    "Later bro 🚀",

  "can you help me":
    "Of course! 😎 What do you need help with?",

  "help me":
    "Say less 😎 What's the problem?",

  "help me code":
    "Let's cook some code 👨‍💻🔥 What are you building?",

  "help me make a website":
    "Bet 🌐🔥 Let's build it!",

  "help me make an app":
    "Say less 📱😎 What kind of app?",

  "help me make a game":
    "LET'S GOOO 🎮🔥 What game are we making?",

  "can you do math":
    "Yep 🧮 Give me the numbers!",

  "can you do maths":
    "Yep 🧮 Send me the problem!",

  "tell me a joke":
    "Why do programmers prefer dark mode? Because light attracts bugs 🐛💀",

  "give me an idea":
    "Make a game where the player has to escape an AI-controlled city 🤖🌆🔥",

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


/* NORMALIZE */

function normalize(text) {

  return text
    .toLowerCase()
    .trim()
    .replace(/[!?.,]+$/g, "");

}


/* CALCULATOR */

function calculate(text) {

  const cleaned = text
    .toLowerCase()

    .replace(
      /what is|what's|calculate|solve|equals|=/g,
      ""
    )

    .replace(/[x×]/g, "*")

    .replace(/÷/g, "/")

    .trim();


  if (
    !/^[0-9+\-*/().%\s]+$/.test(cleaned)
  ) {

    return null;

  }


  if (!/[0-9]/.test(cleaned)) {

    return null;

  }


  try {

    const result =
      Function(
        '"use strict"; return (' +
        cleaned +
        ')'
      )();


    if (
      typeof result !== "number" ||
      !Number.isFinite(result)
    ) {

      return null;

    }


    return `${cleaned} = ${result} ✅`;

  }

  catch (error) {

    return null;

  }

}


/* GET NOVA REPLY */

function getReply(text) {

  const normalized =
    normalize(text);


  /* EXACT REPLY */

  if (replies[normalized]) {

    return replies[normalized];

  }


  /* MATH */

  const math =
    calculate(text);


  if (math) {

    return math;

  }


  /* FLEXIBLE REPLIES */

  if (
    normalized.includes("math") ||
    normalized.includes("maths")
  ) {

    return "Sure! 🧮 Send me a maths problem and I'll solve it.";

  }


  if (
    normalized.includes("joke")
  ) {

    return replies["tell me a joke"];

  }


  if (
    normalized.includes("game")
  ) {

    return replies["help me make a game"];

  }


  if (
    normalized.includes("website")
  ) {

    return replies["help me make a website"];

  }


  if (
    normalized.includes("app")
  ) {

    return replies["help me make an app"];

  }


  if (
    normalized.includes("hello") ||
    normalized.includes("hey")
  ) {

    return replies["hello"];

  }


  /* DEFAULT */

  return "I'm here 😎 Ask me something, give me a maths problem, or tell me what you want to build!";

}


/* ADD MESSAGE */

function addMessage(text, type) {

  const chat =
    document.getElementById("chat");


  const welcome =
    document.getElementById("welcome");


  if (welcome) {

    welcome.remove();

  }


  const row =
    document.createElement("div");


  row.className =
    "message " + type;


  if (type === "user") {

    row.innerHTML =
      `<div class="bubble">
        ${escapeHTML(text)}
      </div>`;

  }

  else {

    row.innerHTML =
      `<div class="nova-name">
        Nova
      </div>

      <div class="nova-text">
        ${escapeHTML(text)}
      </div>`;

  }


  chat.appendChild(row);


  chat.scrollTop =
    chat.scrollHeight;

}


/* SEND */

function sendMessage() {

  const input =
    document.getElementById("message");


  const text =
    input.value.trim();


  if (!text) {

    return;

  }


  addMessage(
    text,
    "user"
  );


  input.value = "";


  autoResize(input);


  /* NOVA THINKING DELAY */

  setTimeout(function() {

    addMessage(
      getReply(text),
      "ai"
    );

  }, 350);

}


/* SUGGESTION BUTTON */

function suggest(text) {

  const input =
    document.getElementById("message");


  input.value =
    text;


  sendMessage();

}


/* ENTER TO SEND */

function handleKey(event) {

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    sendMessage();

  }

}


/* AUTO RESIZE */

function autoResize(element) {

  element.style.height =
    "auto";


  element.style.height =
    Math.min(
      element.scrollHeight,
      130
    ) + "px";

}


/* NEW CHAT */

function newChat() {

  const chat =
    document.getElementById("chat");


  chat.innerHTML = `

    <div id="welcome" class="welcome">

      <div class="hero-orbit">

        <div class="orbit-ring"></div>

        <div class="hero-star">
          ✦
        </div>

        <span class="star s1">
          ✦
        </span>

        <span class="star s2">
          ✦
        </span>

        <span class="star s3">
          ✦
        </span>

      </div>


      <h1>
        NOVA <span>AI</span>
      </h1>


      <p class="tagline">
        Your AI assistant
        &nbsp;✦&nbsp;
        Always here for you
      </p>


      <div class="suggestions">

        <button
          onclick="suggest('Explain something to me')">

          ♧

          <span>
            Explain<br>
            something
          </span>

        </button>


        <button
