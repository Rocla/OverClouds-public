// http://peerjs.com/docs/

HOST = '0.peerjs.com'
PORT = 9000
API_KEY = 'gs0f5vyqmvaemi'  // TMP API key from Peerjs free developer account
SSL = false

var connectToId;
var myName;
var connection;

function getError(err){
    console.log(err);
}

var peer = new Peer({
    host: HOST,
    port: PORT,
    key: API_KEY,
    secure: SSL? true:false
});

// Get peer id from peerjs
peer.on('open', function (id) {
    console.log("your peer id: ", id);
    document.getElementById("myId").innerHTML = id;
});

document.getElementById("connect").addEventListener('click', function (event) {
    myName = document.getElementById("myName").value;
    connectToId = document.getElementById("receiverId").value;

    connection = peer.connect(connectToId); // Etablish connection to peer
});

// Listening to incoming peer connections
peer.on('connection', function(connection) {
    console.log("you got a new connection");

    connection.on('open', function() {
        connection.on('data', function(data) {
            console.log('received: ', data);
            document.getElementById("message").textContent += data.peerName + ": " + data.msg + '\n'; //JSON
        });
    });
});

// Send data to peer
document.getElementById('send').addEventListener('click', function(){
    var msg = document.getElementById("msg").value;
    document.getElementById("msg").value = "";
    document.getElementById("message").textContent += "Me: " + msg + '\n';
    console.log("send: ", msg);

    // Send JSON
    try {
      connection.send({
          msg: msg,
          peerName: myName});
    } catch (e) {
      console.log("You are not connected to a peer")
    }
});

document.getElementById('msg').addEventListener('keyup', function (e) {
    if(e.which == 13) {
        document.getElementById('send').click();
    }
});
