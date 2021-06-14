import { useEffect, useState, useRef } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { LoggingResponse, ListLoggingResponse } from "../types/log";

const LOG_EVENT = "log";
const TIMELINE_EVENT = "logged-before";
const ENDPOINT = `${process.env.backend.host}:${process.env.backend.port}`;

const useLog = () => {
  const [messages, setMessages] = useState<LoggingResponse[]>([]);
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = socketIOClient(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        log: new Date().toISOString(),
      },
    });
    socket.current.on(TIMELINE_EVENT, (data: ListLoggingResponse) => {
      const incomingMessage = data.file;
      setMessages((messages) => [...messages, ...incomingMessage]);
    });
    socket.current.on(LOG_EVENT, (data: LoggingResponse) => {
      const incomingMessage = data;
      setMessages((messages) => [...messages, incomingMessage]);
    });
    return () => {
      socket.current.disconnect();
      return;
    };
  }, []);

  return { messages }; // setFilter
};

export default useLog;
