interface PlatformEvent<T extends string = string, V = void> {
  type: T
  payload: V
}

type InitClient = PlatformEvent<
  'INIT_CLIENT',
  {
    id: string
  }
>

type InitServer = PlatformEvent<
  'INIT_SERVER',
  {
    board: Vector2
    entities: Entity[]
    players?: Player[]
    TICK_DURATION: number
  }
>

type Tick = PlatformEvent<
  'TICK',
  {
    players?: Player[]
    entities: Entity[]
  }
>

type SetDirection = PlatformEvent<
  'SET_DIRECTION',
  {
    direction: Vector2
  }
>

export type Events = InitClient | InitServer | Tick | SetDirection

type EventName = Events['type']
type EventType<E extends EventName> = Extract<Events, { type: E; payload: any }>
export type EventData<E extends EventName> = EventType<E>['payload'] extends never
  ? null | undefined
  : EventType<E>['payload']

export type Send = <E extends EventName>(type: E, data: EventData<E>) => void

type Emit = (event: Events) => void
type EventCallback<E extends EventName> = (data: EventData<E>) => void
type Subscribe = <E extends EventName>(type: E, callback: EventCallback<E>) => () => void

export class Emitter {
  subscriptions: Partial<Record<EventName, EventCallback<any>[]>>

  constructor() {
    this.subscriptions = {}
  }

  subscribe: Subscribe = (event, callback) => {
    if (!this.subscriptions[event]) {
      this.subscriptions[event] = []
    }

    this.subscriptions[event]?.push(callback)

    return () => {
      this.subscriptions[event] = this.subscriptions?.[event]?.filter(
        existCallback => existCallback !== callback,
      )
    }
  }

  emit: Emit = ({ type, payload }) => {
    const callbacks = this.subscriptions[type]
    if (callbacks?.length) {
      callbacks.forEach(c => {
        c(payload)
      })
    }
  }
}
