document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const heroScreen = document.getElementById("hero-screen");
  const chatFeed = document.getElementById("chat-feed");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const newChatBtn = document.getElementById("new-chat-btn");
  const promptChips = document.querySelectorAll(".prompt-chip");
  const responsesLeftSpan = document.getElementById("responses-left");
  const limitPill = document.getElementById("limit-pill");

  // State
  const MAX_RESPONSES = 10;
  let responsesRemaining = MAX_RESPONSES;

  // Canned AI responses
  const aiResponses = {
    "Explain quantum physics in simple terms": "Imagine subatomic particles acting like spinning coins that are both heads and tails at the same time until you look at them!",
    "Help me write a creative sci-fi story": "I'd love to help! Tell me about your main character or setting, and we'll craft the scene together.",
    "Give me a creative web app idea": "How about an interactive ambient productivity app where completing tasks builds a virtual glowing galaxy?"
  };

  // Update limit display and disable inputs when cap is reached
  function updateCounter() {
    if (responsesLeftSpan) responsesLeftSpan.textContent = responsesRemaining;
    
    if (responsesRemaining <= 0 && limitPill) {
      limitPill.textContent = "Response limit reached for this session";
      limitPill.style.color = "#f87171";
      limitPill.style.borderColor = "rgba(239, 68, 68, 0.4)";
      userInput.disabled = true;
      userInput.placeholder = "Limit reached. Click + New Chat!";
      sendBtn.disabled = true;
    }
  }

  // Handle message sending flow
  function handleSendMessage(text) {
    if (!text.trim() || responsesRemaining <= 0) return;

    // Transition from Hero view to empty Chat view
    if (heroScreen && !heroScreen.classList.contains("hidden")) {
      heroScreen.classList.add("hidden");
      chatFeed.classList.remove("hidden");
    }

    // Render User Message Bubble
    const userMsg = document.createElement("div");
    userMsg.className = "msg-bubble user-msg";
    userMsg.textContent = text;
    chatFeed.appendChild(userMsg);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Render Typing Indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "msg-bubble ai-msg typing-indicator";
    typingIndicator.innerHTML = "<span></span><span></span><span></span>";
    chatFeed.appendChild(typingIndicator);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    // Deliver AI Response
    setTimeout(() => {
      chatFeed.removeChild(typingIndicator);

      responsesRemaining--;
      updateCounter();

      const aiMsg = document.createElement("div");
      aiMsg.className = "msg-bubble ai-msg";
      
      // Use canned response or default backup
      aiMsg.textContent = aiResponses[text] || "I'm Nova AI! How else can I assist you with this?";

      chatFeed.appendChild(aiMsg);
      chatFeed.scrollTop = chatFeed.scrollHeight;
    }, 700);
  }

  // 1. Submit Form via Send Button or Enter Key
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = userInput.value;
      userInput.value = "";
      handleSendMessage(text);
    });
  }

  // 2. Click Prompt Chip Buttons
  promptChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const promptText = chip.getAttribute("data-prompt") || chip.textContent.trim();
      handleSendMessage(promptText);
    });
  });

  // 3. Reset Session via "+ New Chat" Button
  if (newChatBtn) {
    newChatBtn.addEventListener("click", () => {
      chatFeed.innerHTML = "";
      chatFeed.classList.add("hidden");
      heroScreen.classList.remove("hidden");
      userInput.value = "";
      
      responsesRemaining = MAX_RESPONSES;
      if (limitPill) {
        limitPill.style.color = "#d8b4fe";
        limitPill.style.borderColor = "rgba(168, 85, 247, 0.3)";
        limitPill.innerHTML = 'Responses left: <span id="responses-left">10</span>/10';
      }
      userInput.disabled = false;
      userInput.placeholder = "Type your message...";
      sendBtn.disabled = false;
    });
  }
});
