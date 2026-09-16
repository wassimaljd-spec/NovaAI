document.addEventListener("DOMContentLoaded", () => {
  const heroScreen = document.getElementById("hero-screen");
  const chatFeed = document.getElementById("chat-feed");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const newChatBtn = document.getElementById("new-chat-btn");
  const promptChips = document.querySelectorAll(".prompt-chip");

  // Send message handler
  function sendMessage(text) {
    if (!text.trim()) return;

    // Hide hero section & reveal chat feed
    heroScreen.classList.add("hidden");
    chatFeed.classList.remove("hidden");

    // Add User Message
    const userMsg = document.createElement("div");
    userMsg.className = "msg-bubble user-msg";
    userMsg.textContent = text;
    chatFeed.appendChild(userMsg);

    // Scroll down
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg = document.createElement("div");
      aiMsg.className = "msg-bubble ai-msg";
      aiMsg.textContent = "I'm Nova AI! How can I assist you with that?";
      chatFeed.appendChild(aiMsg);
      chatFeed.scrollTop = chatFeed.scrollHeight;
    }, 600);
  }

  // Submit via Form
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(userInput.value);
    userInput.value = "";
  });

  // Click quick prompt chips
  promptChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const text = chip.textContent.replace(/^[^\s]+\s*/, ""); // Strip emoji
      sendMessage(text);
    });
  });

  // Reset to initial screen on "+ New chat"
  newChatBtn.addEventListener("click", () => {
    chatFeed.innerHTML = "";
    chatFeed.classList.add("hidden");
    heroScreen.classList.remove("hidden");
    userInput.value = "";
  });
});
