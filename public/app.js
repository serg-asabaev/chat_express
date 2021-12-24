var socket = io();
var send = document.getElementById('submit');

socket.emit('conn',"YEAH!!!");

send.onclick = function(){
    var nameinput = document.getElementById('username');
    var messageinput = document.getElementById('message');

    var username = nameinput.value;
    var message = messageinput.value;
    messageinput.value = "";

    var data = {'user':username,'message':message}

    socket.emit('chat',data);
}

socket.on('broadcast', function(data){
    console.log(data);
    var output = document.getElementById('output');
    output.innerText += data.user + ": " + data.message + "\n";
    // document.write(data)
});

socket.on('chatPreload', function(data){
    console.log(data.user,data.message);
    var output = document.getElementById('output');
    output.innerText += data.user + ": " + data.message + "\n";
    // document.write(data)
});