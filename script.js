const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messagesList = document.getElementById('messagesList');
const newChatBtn = document.getElementById('newChatBtn');

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Sends user message without waiting for or triggering an AI response
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  const row = document.createElement('div');
  row.className = 'message-row user';
  row.innerHTML = `
    <div class="avatar">👤</div>
    <div class="message-content">
      <div class="bubble">${text}</div>
      <div class="timestamp">${getCurrentTime()} ✓✓</div>
    </div>
  `;

  messagesList.appendChild(row);
  messagesList.scrollTop = messagesList.scrollHeight;
  userInput.value = '';
});

function handleChipClick(text) {
  userInput.value = text;
  userInput.focus();
}

newChatBtn.addEventListener('click', () => {
  messagesList.innerHTML = '';
});
