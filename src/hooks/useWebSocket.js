import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export const useWebSocket = (url = 'http://localhost:5000') => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState({});

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('joinDashboard');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('audienceUpdate', (data) => {
      setLiveData(prev => ({
        ...prev,
        [data.stationId]: data
      }));
    });

    socketInstance.on('stationStatusUpdate', (data) => {
      setLiveData(prev => ({
        ...prev,
        stationStatus: data
      }));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return { socket, isConnected, liveData };
};
