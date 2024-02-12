const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') {
        return;
    } else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');

        setTimeout(async () => {
            appendMessage('bot', 'This Source Coded By DuyKhanhDo \nhttps://github.com/DuyKhanhDo/XLN-Group-C');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);

        return;
    }

    appendMessage('user', message);
    userInput.value = '';

    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '189f6575bbmsh2c36c0373ed7145p1811f1jsn566e2ded82d8',
            'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com',
        },
        body: JSON.stringify({
            query: message,
        }),
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        appendMessage('bot', result.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    } catch (error) {
        console.error(error);
        appendMessage('bot', 'Error: Unable to fetch response');
        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }
}

function appendMessage(sender, message) {
    info.style.display = 'none';

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);

    chatLog.scrollTo(0, chatLog.scrollHeight);
}
