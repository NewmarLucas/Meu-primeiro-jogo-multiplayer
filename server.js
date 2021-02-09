import * as io from "socket.io"
import express from 'express'
import { createServer } from 'http'
import createGame from './public/game.js'


const app = express()
const server = createServer(app)
const socketio = new io.Server(server);

app.use(express.static('public'))

const game = createGame()
game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'player2', playerX: 0, playerY: 3 })
game.addFruit({ fruitId: 'fruit1', fruitX: 3, fruitY: 3 })
game.addFruit({ fruitId: 'fruit2', fruitX: 5, fruitY: 3 })

console.log(game.state)

socketio.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})