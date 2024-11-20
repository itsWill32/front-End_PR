let ws: WebSocket | null = null;

export const connectWebSocket = (): WebSocket => {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log("Conexión WebSocket establecida con el backend.");
    };

    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
      ws = null; // Resetear la variable ws
    };

    ws.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };
  }
  return ws;
};
