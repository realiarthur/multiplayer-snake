import WebSocket from 'ws'
import express from 'express'

const app = express()

const httpServer = app.listen(8080)

const wsServer = new WebSocket.Server({
  noServer: true,
})

wsServer.on('connection', ws => {
  ws.on('message', msg => {
    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        console.debug(client)
        client.send(msg.toString())
      }
    })
  })
})

httpServer.on('upgrade', async function upgrade(request, socket, head) {
  //proper connection close in case of rejection
  // return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')

  wsServer.handleUpgrade(request, socket, head, ws => {
    wsServer.emit('connection', ws, request)
  })
})
