import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io(serverUrl);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
