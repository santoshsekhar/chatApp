var app = require('express')()
const server =  require('http').Server(app)
const io = require('socket.io')(server)

const port = 3000

server.listen(port, () =>{
    console.log(`http://localhost:${port} `)
})

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/foods', (req,res)=>{
    res.sendFile( __dirname + '/public/foods.html')
})

app.get('/movies', (req,res)=>{
    res.sendFile( __dirname + '/public/movies.html')
})

app.get('/sports', (req,res)=>{
    res.sendFile( __dirname + '/public/sports.html')
})
const tech = io.of('/tech')

tech.on('connection', (socket)=>{
    // console.log('A user connected')
    socket.on('join',(data) =>{
        socket.join(data.room)
        tech.in(data.room).emit('message',`New user joined ${data.room}`)
    })

    socket.on('message',(data)=>{
        tech.in(data.room).emit('message',data.msg )
    })

    io.on('disconnect',()=>{
        console.log('User Disconnected');
        tech.emit('message', 'User disconnected')
    })

})