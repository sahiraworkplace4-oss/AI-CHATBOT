const input = document.getElementById("message");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

async function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    // Show user's message
    addMessage(message, "user-message");

    input.value = "";
    input.focus();

    // Show typing indicator
    const typingMessage = addMessage("AI is typing...", "ai-message");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove typing message
        typingMessage.remove();

        // Show AI response
        addMessage(data.reply, "ai-message");

    } catch (error) {
        typingMessage.remove();

        addMessage(
            "Sorry, I couldn't connect to the AI. Please try again.",
            "ai-message"
        );

        console.error(error);
    }
}

function addMessage(text, className) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;

    messages.appendChild(messageDiv);

    messages.scrollTop = messages.scrollHeight;

    return messageDiv;
}

// Send when button is clicked
sendButton.addEventListener("click", sendMessage);

// Send when Enter is pressed
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});