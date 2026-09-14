const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messagesList = document.getElementById('messagesList');
const newChatBtn = document.getElementById('newChatBtn');
const chatContainer = document.querySelector('.chat-container');

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function enterChatView() {
  if (!chatContainer.classList.contains('chat-active')) {
    chatContainer.classList.add('chat-active');
  }
}

function appendUserMessage(text, timestamp = getCurrentTime()) {
  enterChatView();

  const row = document.createElement('div');
  row.className = 'message-row user';
  row.innerHTML = `
    <div class="avatar">👤</div>
    <div class="message-content">
      <div class="bubble">${escapeHtml(text)}</div>
      <div class="timestamp">${timestamp} ✓✓</div>
    </div>
  `;

  messagesList.appendChild(row);
  messagesList.scrollTop = messagesList.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  sendUserMessage(text);
  userInput.value = '';
});

function sendUserMessage(text) {
  const time = getCurrentTime();
  appendUserMessage(text, time);
  saveMessageToStorage(text, time);
}

function handleChipClick(text) {
  sendUserMessage(text);
}

function saveMessageToStorage(text, time) {
  const history = JSON.parse(localStorage.getItem('nova_chat_history') || '[]');
  history.push({ text, time });
  localStorage.setItem('nova_chat_history', JSON.stringify(history));
}

function loadMessageHistory() {
  const history = JSON.parse(localStorage.getItem('nova_chat_history') || '[]');
  if (history.length > 0) {
    enterChatView();
    history.forEach((msg) => {
      appendUserMessage(msg.text, msg.time);
    });
  }
}

newChatBtn.addEventListener('click', () => {
  messagesList.innerHTML = '';
  chatContainer.classList.remove('chat-active');
  localStorage.removeItem('nova_chat_history');
});

loadMessageHistory();
