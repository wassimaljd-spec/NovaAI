const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const messagesList = document.getElementById('messagesList');
const newChatBtn = document.getElementById('newChatBtn');
const backBtn = document.getElementById('backBtn');
const historyList = document.getElementById('historyList');

let activeChatId = null;

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function enterChatView() {
  document.body.classList.add('chat-active');
}

function exitChatView() {
  document.body.classList.remove('chat-active');
}

function renderMessageUI(text, timestamp) {
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

function renderAIMessageUI(text, timestamp) {
  const row = document.createElement('div');
  row.className = 'message-row ai';
  row.innerHTML = `
    <div class="avatar">✨</div>
    <div class="message-content">
      <div class="bubble">${escapeHtml(text)}</div>
      <div class="timestamp">${timestamp}</div>
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

/* Chat Storage & Session Logic */
function getSavedSessions() {
  return JSON.parse(localStorage.getItem('nova_chat_sessions') || '[]');
}

function saveSessions(sessions) {
  localStorage.setItem('nova_chat_sessions', JSON.stringify(sessions));
}

function sendUserMessage(text) {
  const time = getCurrentTime();
  enterChatView();
  renderMessageUI(text, time);

  let sessions = getSavedSessions();

  if (!activeChatId) {
    activeChatId = Date.now().toString();
    const newSession = {
      id: activeChatId,
      title: text,
      messages: [{ sender: 'user', text, time }]
    };
    sessions.unshift(newSession);
  } else {
    const session = sessions.find(s => s.id === activeChatId);
    if (session) {
      session.messages.push({ sender: 'user', text, time });
    }
  }

  saveSessions(sessions);
  renderHistoryUI();

  // --- Dynamic AI Automatic Reply Logic ---
  const cleanInput = text.trim().toLowerCase();
  
  // Custom Response Library
  const responses = {
    "fuck you": "Fuck you too!",
    "hi": "Hey there! How can I help you today?",
    "hello": "Hello! What are we working on today?",
    "hey": "Hey! How's it going?",
    "who are you": "I'm NOVA, your personal AI assistant.",
    "your name": "My name is NOVA!",
    "how are you": "Running at 100% efficiency!",
    "thank": "You're welcome! Let me know if you need anything else.",
    "bye": "Catch you later! Have a great day.",
    "joke": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "ping": "Pong! 🏓"
  };

  let replyText = "I received your message! (Connect me to an API to get real answers)."; // Default fallback

  // Check input against keywords
  for (const [key, val] of Object.entries(responses)) {
    if (cleanInput.includes(key)) {
      replyText = val;
      break;
    }
  }

  // Trigger AI response after a slight delay
  setTimeout(() => {
    const aiTime = getCurrentTime();
    renderAIMessageUI(replyText, aiTime);

    let updatedSessions = getSavedSessions();
    const currentSession = updatedSessions.find(s => s.id === activeChatId);
    if (currentSession) {
      currentSession.messages.push({ sender: 'ai', text: replyText, time: aiTime });
      saveSessions(updatedSessions);
    }
  }, 400);
}

function renderHistoryUI() {
  const sessions = getSavedSessions();
  historyList.innerHTML = '';

  sessions.forEach(session => {
    const item = document.createElement('div');
    item.className = `history-item ${session.id === activeChatId ? 'active' : ''}`;
    
    item.innerHTML = `
      <span class="history-title-text">${escapeHtml(session.title)}</span>
      <button class="delete-chat-btn" title="Delete chat">🗑️</button>
    `;

    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-chat-btn')) {
        e.stopPropagation();
        deleteSession(session.id);
      } else {
        loadSession(session.id);
      }
    });

    historyList.appendChild(item);
  });
}

function loadSession(id) {
  const sessions = getSavedSessions();
  const session = sessions.find(s => s.id === id);
  if (!session) return;

  activeChatId = id;
  messagesList.innerHTML = '';
  enterChatView();

  session.messages.forEach(msg => {
    if (msg.sender === 'ai') {
      renderAIMessageUI(msg.text, msg.time);
    } else {
      renderMessageUI(msg.text, msg.time);
    }
  });

  renderHistoryUI();
}

function deleteSession(id) {
  let sessions = getSavedSessions();
  sessions = sessions.filter(s => s.id !== id);
  saveSessions(sessions);

  if (activeChatId === id) {
    startNewChat();
  } else {
    renderHistoryUI();
  }
}

function startNewChat() {
  activeChatId = null;
  messagesList.innerHTML = '';
  exitChatView();
  renderHistoryUI();
}

/* Event Listeners */
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  sendUserMessage(text);
  userInput.value = '';
});

function handleChipClick(text) {
  sendUserMessage(text);
}

backBtn.addEventListener('click', () => {
  exitChatView();
});

newChatBtn.addEventListener('click', () => {
  startNewChat();
});

// Initial Load
renderHistoryUI();
