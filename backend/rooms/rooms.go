package rooms

import "fmt"

type Room struct{
	name       string
    clients    map[*Client]bool
    register   chan *Client
    unregister chan *Client
    broadcast  chan *Message
}

func NewRoom(name string) *Room{
	return &Room{
		name:       name,
        clients:    make(map[*Client]bool),
        register:   make(chan *Client),
        unregister: make(chan *Client),
        broadcast:  make(chan *Message),
	}
}

func (room *Room) RunRoom() {
    for {
        select {

        case client := <-room.register:
            room.registerClientInRoom(client)

        case client := <-room.unregister:
            room.unregisterClientInRoom(client)

        case message := <-room.broadcast:
            room.broadcastToClientsInRoom(message)
        }
    }
}

func (room *Room) registerClientInRoom(client *Client) {
    room.notifyClientJoined(client)
    room.clients[client] = true
}

func (room *Room) unregisterClientInRoom(client *Client) {
    if _, ok := room.clients[client]; ok {
        delete(room.clients, client)
    }
}

func (room *Room) broadcastToClientsInRoom(message []byte) {
    for client := range room.clients {
        client.send <- message
    }
}