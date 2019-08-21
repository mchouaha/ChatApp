// Make connection
const socket = io.connect('http://localhost:4000');

// Query DOM
let message = document.getElementById('message'),
    sender = document.getElementById('sender'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', { sender: sender.value });
});

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data.sender + ' is typing a message...</em></p>';
});
