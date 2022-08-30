const socket = io();

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container-1');
const btn = document.querySelector('.btn');

form.addEventListener("submit",e =>{
    e.preventDefault();
    const message = messageInp.value;
    if(message === "" ){
        btn.Style.cursor = "none";
    }else{
            append(`you : ${message}`,"right");
            socket.emit('send',message);
            messageInp.value = ''
    }
})

const append =  (message,position) =>{
    
    const messageElement = document.createElement('div');

    if(position === "middle"){
        messageElement.classList.add(position)
    }
    else{
        if(window.innerWidth < 700 && message.length > 25 ){

            if(message.length <= 30){
                messageElement.style.width = "15%";
            }
            if(message.length <= 35){
                messageElement.style.width = "23%";
            } 
            
            if(message.length <= 40){
                messageElement.style.width = "40%";
            }
            if(message.length <= 50){
                messageElement.style.width = "50%";
            }
            
            if(message.length >= 50){
                messageElement.style.width = "60%";
            }
            
        }
    
        if(window.innerWidth > 700 && message.length > 100){
            messageElement.style.width = "80%";
        }
        messageElement.classList.add('message')
    }

    // if()
    messageElement.innerText = message;
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const user_name = prompt('Enter your name to join');
socket.emit("new-user-joined",user_name);

socket.on("user-joined", name =>{
    append(`${name} joined the chat`,"middle");
})

socket.on('recieve', data => {
    append(`${data.name} : ${data.message}`,"left")
})

socket.on('left', name => {
    append(`${name} left the chat`,"middle")
})
