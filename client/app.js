const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName= '';

loginForm.addEventListener('submit', (event) => {
  login(event);
});

const login = () => {
  event.preventDefault();

  if(userNameInput.value == '') {
    alert('Type your name');
  } else {
    userName == userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}