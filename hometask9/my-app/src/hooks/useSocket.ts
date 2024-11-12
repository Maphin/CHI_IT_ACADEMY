import { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { INotificationNewPost } from '../types/INotificationNewPost';

const SOCKET_SERVER_URL = process.env.REACT_APP_API_BASE_URL + 'notifications';

export const useSocket = () => {
  const [newPostData, setNewPostData] = useState<INotificationNewPost | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
      const socketInstance = io(SOCKET_SERVER_URL, {
          transports: ['websocket', 'polling'],
          autoConnect: true,
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
      });

      setSocket(socketInstance);
      
      socketInstance.on('newPost', (data: INotificationNewPost) => {
        setNewPostData(data);
      })

      return () => {
        socketInstance.disconnect();
      }
  },[]);
  
  return { newPostData, socket };
};
