import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: '/notifications',
    cors: {
        origin: '*'
    }
})

export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        console.log('Websocket initialized');
    }

    handleConnection(client: Socket) {
        console.log('Client connected', client.id);
    }
    handleDisconnect(client: Socket) {
        console.log('Client disconnected', client.id);
    }

    @SubscribeMessage('newPost')
    handleNewPost(@MessageBody() data: { message: string, user: string }) {
        this.server.emit('newPost', data);
    }
}