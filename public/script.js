const socket = io();

let text = document.querySelector("#message-field");
let btn = document.getElementById("btn");
let chat_box = document.querySelector(".chat-section");

let userName;
let textMessage;

do{
    userName = prompt("Name : ")
}while(!userName)

text.addEventListener("change",(e)=>{
    textMessage = e.target.value;
})
btn.addEventListener('click' ,()=>{
    sendMessage(textMessage);
})

function sendMessage(message){
    let msg = {
        user:userName,
        message:message
    }
    appendMessage(msg , "outgoing");
    text.value = "";
    scroll();
    socket.emit("message" ,msg);
}

function appendMessage(msg , type){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add(type , "message");
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    chat_box.appendChild(mainDiv);
}

socket.on("messages",(msg)=>{
    appendMessage(msg , "incoming");
    scroll();
})

function scroll(){
    chat_box.scrollTop = chat_box.scrollHeight;
}