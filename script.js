const chat =
  document.getElementById("chat");

const messageInput =
  document.getElementById("message");


function addMessage(text, type) {

  const message =
    document.createElement("div");

  message.className =
    "message " + type;

  message.textContent =
    text;

  chat.appendChild(message);

  chat.scrollTop =
    chat.scrollHeight;

  return message;
}


async function sendMessage() {

  const text =
    messageInput.value.trim();

  if (!text) return;


  const welcome =
    document.getElementById("welcome");

  if (welcome) {
    welcome.remove();
  }


  addMessage(
    text,
    "user"
  );


  messageInput.value = "";

  autoResize(
    messageInput
  );


  const loading =
    addMessage(
      "Thinking... 🤖",
      "ai"
    );


  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message: text
        })

      });


    const data =
      await response.json();


    loading.remove();


    if (!response.ok) {
      throw new Error(
        data.error ||
        "Something went wrong"
      );
    }


    addMessage(
      data.reply,
      "ai"
    );


  } catch (error) {

    loading.remove();


    addMessage(
      "Sorry 😭 Something went wrong. Check your server.",
      "ai"
    );


    console.error(error);

  }

}


function suggest(text) {

  messageInput.value =
    text;

  sendMessage();

}


function handleKey(event) {

  if (
    event.key === "Enter" &&
    !event.shiftKey
  ) {

    event.preventDefault();

    sendMessage();

  }

}


function autoResize(textarea) {

  textarea.style.height =
    "auto";

  textarea.style.height =
    Math.min(
      textarea.scrollHeight,
      140
    ) + "px";

}


function newChat() {

  chat.innerHTML = `

    <section
      class="welcome"
      id="welcome">

      <div class="welcome-icon">
        🤖
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
          onclick="suggest('Explain something to me')">
          💡 Explain something
        </button>

        <button
          onclick="suggest('Help me write something')">
          ✍️ Help me write
        </button>

        <button
          onclick="suggest('Give me an idea')">
          🚀 Give me an idea
        </button>

      </div>

    </section>

  `;

}
