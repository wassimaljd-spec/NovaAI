// 1. Paste your Gemini API key inside the quotes below
const API_KEY = "AQ.Ab8RN6LJJKsBtstjpYxZI-_50QE5LGFe6IZ1JXHR2nnBmEJzYQ";

// 2. Function to communicate with the Gemini API
async function askNovaAI(userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return "Error: " + data.error.message;
    }

    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("Network Error:", err);
    return "Failed to connect to Nova AI. Please check your internet connection.";
  }
}

// 3. Connect the JavaScript to your HTML user interface
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.querySelector("button"); 
  const inputField = document.querySelector("input");
  const chatBox = document.querySelector("#chat") || document.body;

  if (sendBtn && inputField) {
    sendBtn.addEventListener("click", async () => {
      const userText = inputField.value.trim();
      if (!userText) return;

      // Display the user's message
      const userMsg = document.createElement("p");
      userMsg.innerHTML = `<strong>You:</strong> ${userText}`;
      chatBox.appendChild(userMsg);
      
      inputField.value = "";

      // Display a temporary loading status
      const loadingMsg = document.createElement("p");
      loadingMsg.innerHTML = "<strong>Nova AI:</strong> Thinking...";
      chatBox.appendChild(loadingMsg);

      // Fetch the response from Nova AI
      const reply = await askNovaAI(userText);
      loadingMsg.innerHTML = `<strong>Nova AI:</strong> ${reply}`;
    });
  }
});
