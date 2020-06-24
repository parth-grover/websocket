const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    user_name = prompt('Please enter your name: ')
} while(!user_name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        send_message(e.target.value)
    }
})

function send_message(message) {
    let msg = {
        user: user_name,
        message: message.trim()
    }
    append_message(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msg)

}

function append_message(msg, type) {
    let main_div = document.createElement('div')
    main_div.classList.add(type, 'message')
    let html = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    main_div.innerHTML = html
    messageArea.appendChild(main_div)
}

socket.on('message', (msg) => {
    append_message(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}