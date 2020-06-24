const express = require('express')

const app = express()

const http = require('http')

const server = http.createServer(app)

const port = process.env.port || 3001



server.listen(port,()=>{
	console.log(`Listen on port ${port}`)
})

app.use(express.static(__dirname +'/public'));

app.get('/',(req,res) =>{
	res.sendFile(__dirname + '/index.html')
})


const socket_con = require('socket.io')(server) 

socket_con.on('connection',(socket) =>{
	console.log('socket connected')
	socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

