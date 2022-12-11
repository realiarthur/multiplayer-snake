import WebSocket from 'ws'
import express from 'express'
import state from './core/state'

import { Events, Send } from 'classes'

const app = express()

const httpServer = app.listen(8080)

const wsServer = new WebSocket.Server({
  noServer: true,
})


wsServer.on('connection', ws => {
  const send: Send = (type, payload) => ws.send(JSON.stringify({ type, payload }))

  ws.on('message', message => {
    try {
      const { type, payload } = JSON.parse(message.toString()) as Events

      switch (type) {
        case 'INIT_CLIENT': {
          state.addPlayer(payload.id)
          const { board, players } = state

          send('INIT_SERVER', { board, players })
          break
        }
      }
    } catch (err) {
      console.error(err)
    }
  })
})

setInterval(() => {
  state.tick()

  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      const send: Send = (type, payload) => client.send(JSON.stringify({ type, payload }))
      const { players } = state
      send('TICK', { players })
    }
  })
}, 100)

wsServer.on('close', function close() {
  console.log('disconnected')
})

httpServer.on('upgrade', async function upgrade(request, socket, head) {
  //proper connection close in case of rejection
  // return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')

  wsServer.handleUpgrade(request, socket, head, ws => {
    wsServer.emit('connection', ws, request)
  })
})
