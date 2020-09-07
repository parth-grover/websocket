const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = express();

const http = require('http');
const { stringify } = require('querystring');

const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/*mongoose.connect(process.env.DATABASE_LOCAL,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true,
	useFindAndModify:false
})
.then(() => console.log("Db connected successfully"));

const webChatSchema = new mongoose.Schema({
	name:String,
	message:String
});
const Webchat = mongoose.model('Webchat',webChatSchema);
const testwebchat = new Webchat({
	name:"Aman",
	message:"hello"
});
testwebchat.save().then(doc =>{
	console.log(doc)
}).catch(err =>{
	console.log(err)
})*/

const socket_con = require('socket.io')(server);

socket_con.on('connection', (socket) => {
  console.log('socket connected');
  //socket.on('message', (msg) => {
  //socket.broadcast.emit('message', msg);
  //});
  socket.on('vue_msg', (msg) => {
    socket.emit('re_vue_msg', msg);
  });
});
