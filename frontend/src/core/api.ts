import { v4 as uuidv4 } from 'uuid'
import config from 'core/config'
import { Events, Send, Emitter } from 'classes'

const createWS = (id: string) => {
  const server = new WebSocket(config.WS_URL)
  const send: Send = (type, payload) => server.send(JSON.stringify({ type, payload }))
  const emitter = new Emitter()

  server.onopen = function () {
    send('INIT_CLIENT', { id })
  }

  server.onmessage = event => {
    try {
      const { data } = event
      const parsedEvent = JSON.parse(data) as Events
      emitter.emit(parsedEvent)
      //   console.debug(parsedEvent)
    } catch (err) {
      console.error(err)
    }
  }

  return { send, emitter, id }
}

export const { send, emitter, id } = createWS(uuidv4())
