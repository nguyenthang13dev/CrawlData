// lib/signalr.js
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import type { HubConnection } from '@microsoft/signalr';

export function useSignalR(signalRUrl: string, userName: string) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [status, setStatus] = useState('Disconnected');
  const [kySoData, setKySoData] = useState<{
    userName: string;
    listKySoInfo: any;
  } | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(signalRUrl, {
        accessTokenFactory: () => 'your-jwt-token',
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        setStatus('Connected');
        console.log('SignalR Connected');
      })
      .catch((err) => {
        setStatus('Error');
        console.error('SignalR Connection Error:', err);
      });

    // Lắng nghe sự kiện KySoStart
    newConnection.on('KySoStart', (userName, listKySoInfo) => {
      if (userName === userName) {
        setKySoData({ userName, listKySoInfo });
      }
    });

    // Lắng nghe sự kiện CertificateStatus
    newConnection.on('CertificateStatus', (userName, status) => {
      console.log(`Certificate Status for ${userName}: ${status}`);
    });

    return () => {
      newConnection.stop();
    };
  }, [signalRUrl, userName]);

  // Gửi thông báo trạng thái chứng chỉ
  const notifyCertificateStatus = async (userName: string, status: string) => {
    if (connection && connection.state === 'Connected') {
      await connection.invoke('NotifyCertificateStatus', userName, status);
    }
  };

  // Lưu kết nối (tương tự SaveConnection trong WPF)
  const saveConnection = async (userName: string) => {
    if (connection && connection.state === 'Connected') {
      await connection.invoke('SaveConnection', userName);
    }
  };

  return {
    connection,
    status,
    kySoData,
    notifyCertificateStatus,
    saveConnection,
  };
}
