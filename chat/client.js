const socket = io('https://sleepy-basin-24157.herokuapp.com/');

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name?");
appendMessage("You joined");
socket.emit("join", name);

socket.on("join", name=>{
    appendMessage(`${name} joined in the room`);
});
socket.on("chat-message", data => {
    appendMessage(`${data.name} : ${data.message}`);
});
socket.on("leave", name=>{
    appendMessage(`${name} left the room`);
});

messageForm.addEventListener("submit", e=>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`);
    socket.emit("chat-message", message);
    messageInput.value = "";
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    
    messageContainer.append(messageElement);
}