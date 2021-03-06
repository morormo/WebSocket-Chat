const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");
const socket = io();

let userName= '';

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('logged', ({ name }) => addMessage('Chat Boy', `${name} has joined the conversation!`));
socket.on('disconnected', ({ name }) => addMessage('Chat Boy', `${name} has left the conversation!`));

loginForm.addEventListener('submit', (event) => {
  login(event);
});

addMessageForm.addEventListener('submit', (event) => {
  sendMessage(event);
});

const login = () => {
  event.preventDefault();

  if(userNameInput.value == '') {
    alert('Type your name');
  } else {
    userName = userNameInput.value;
    socket.emit('logged', { name: userName, id: socket.id});
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if(!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}