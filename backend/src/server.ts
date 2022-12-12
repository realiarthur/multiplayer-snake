import WebSocket from 'ws'
import express from 'express'
import * as engine from './core/engine'
import { Events, Send, EventData } from 'classes'

const app = express()
const httpServer = app.listen(8080)

export const wsServer = new WebSocket.Server({
  noServer: true,
})

httpServer.on('upgrade', async function upgrade(request, socket, head) {
  //proper connection close in case of rejection
  // return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')

  wsServer.handleUpgrade(request, socket, head, ws => {
    wsServer.emit('connection', ws, request)
  })
})

wsServer.on('connection', ws => {
  const send: Send = (type, payload) => ws.send(JSON.stringify({ type, payload }))
  let playerId: string

  ws.on('close', function close() {
    engine.onClose(playerId)
    ws.terminate()
  })

  ws.on('message', message => {
    try {
      const event = JSON.parse(message.toString()) as Events

      if (event.type === 'INIT_CLIENT') {
        playerId = event.payload.id
      }

      engine.onMessage(event, send, playerId)
    } catch (err) {
      console.error(err)
    }
  })
})

const sendAll: Send = (type, payload) => {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, payload }))
    }
  })
}

const stop = engine.start(sendAll)

wsServer.on('close', stop)
