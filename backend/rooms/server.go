package rooms

import "fmt"

type WsServer struct {
    rooms      map[*Room]bool
}

func NewWebsocketServer() *WsServer {
    return &WsServer{
        rooms: make(map[*Room]bool),
    }
}